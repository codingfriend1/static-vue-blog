import { defineStore, storeToRefs } from 'pinia';
import { reactive, toRefs, ref, onMounted, onBeforeUnmount } from 'vue';
import { useGtag } from "vue-gtag-next";
import throttle from 'lodash.throttle';
import router from '../router.js';
import { useMarkdownifyStore } from '../stores/markdownify-store.js'

export const useScrollTracking = defineStore('scrollTracking', () => {
  // Constants and Configuration
  const BOTTOM_READING_HEIGHT = 100;
  const READER_SCROLL_PERCENT = 100;
  const DEBUG = false;
  let windowHeight = window.innerHeight;

  // State
  let postBodyEl = ref(null);
  let furthestScroll = 1;
  let alreadyRead = false;
  const { set, event } = useGtag();
  const { page } = storeToRefs(useMarkdownifyStore())

  // Utility Functions
  const getOffset = (el) => {
    let _y = 0;
    while (el && !isNaN(el.offsetTop)) {
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return _y;
  };

  const getScrollPosition = () => {
    if (!postBodyEl.value) return 0;
    const elementPositionOnPage = getOffset(postBodyEl.value);
    const relativeScrollPosition = windowHeight + window.pageYOffset - elementPositionOnPage - BOTTOM_READING_HEIGHT;
    const contentHeight = postBodyEl.value.clientHeight;
    return Math.round((relativeScrollPosition / contentHeight) * 100);
  };

  // Main Logic
  const notifyRead = () => {
    alreadyRead = true;
    if (DEBUG) {
      alert(`Thanks for reading, Scroll: ${furthestScroll}%`);
    } else {
      set('metric2', 1);
      event('Read', {
        page_path: page.value.url,
        page_title: page.value.title,
        'event_category': 'Interest',
        'event_label': page.value.title
      });
    }
  };

  const trackScrolling = throttle(() => {
    furthestScroll = Math.max(getScrollPosition(), furthestScroll);
    if (furthestScroll > READER_SCROLL_PERCENT && !alreadyRead) {
      notifyRead();
      window.removeEventListener("scroll", trackScrolling);
    }
  }, 400);

  // Reset trackScrolling
  const afterNavigating = () => {
    alreadyRead = false;
    furthestScroll = 1;
    window.removeEventListener("scroll", trackScrolling);
    if (true) { // Replace this condition with your cookies policy
      window.addEventListener("scroll", trackScrolling);
    }
  };

  // Lifecycle Hooks
  onMounted(() => {
    window.addEventListener("scroll", trackScrolling);
    windowHeight = window.innerHeight;
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", trackScrolling);
  });

  // Router Hook
  router.afterEach(afterNavigating);

  return toRefs(reactive({
    postBodyEl
  }));
});