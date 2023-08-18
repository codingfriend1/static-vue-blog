// markdownify Store
import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import router from '../router.js'
import { trackRouter } from "vue-gtag-next";

export const useMarkdownifyStore = defineStore('markdownify', () => {

  const META_TAGS_WITH_NAME = [
    'owner', 'author', 'application-name', 'generator', 'referrer', 'theme-color',
    'copyright', 'medium', 'language', 'description', 'keywords', 'robots', 'viewport'
  ];

  function prettifyDate(value) {
    var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    var date = new Date(value);
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  function prettifyDates(page) {
    if(!page) { return null }
    page.createdAtPrettified = prettifyDate(page.createdAt)
    page.updatedAtPrettified = prettifyDate(page.updatedAt)

    return page
  }

  function createMetaTag(page, key) {

    const content = page[key]

    const dismiss = [
      'html',
      'baseUrl',
      'url',
      'created',
      'updated',
      'draft',
      'filename',
      'createdAtPrettified',
      'updatedAtPrettified',
    ]

    if(dismiss.includes(key)) { return ''; }

    // Define templates for creating meta tags based on key
    const templates = {
      title: () => `
      <meta name="pagename" content="${content}" />
      <meta property="og:title" content="${content}" />
      <meta name="twitter:title" content="${content}" />`,
      author: () => `
      <meta name="author" content="${content}" />
      <meta property="article:author" content="${content}" />`,
      description: () => `
      <meta name="description" content="${content}" />
      <meta property="og:description" content="${content}" />
      <meta name="twitter:description" content="${content}" />`,
      absolute_url: () => `
      <meta name="url" content="${content}" />
      <meta property="og:url" content="${content}" />
      <meta name="identifier-URL" content="${content}" />`,
      updatedAt: () => `
      <meta property="article:modified_time" content="${content}" />`,
      createdAt: () => `
      <meta property="article:published_time" content="${content}" />`,
      default: () => META_TAGS_WITH_NAME.includes(key) ? `
      <meta name="${key}" content="${content}" />`: `
      <meta property="${key}" content="${content}" />`
    };

    // return (templates[key] || templates.default)();

    const metaHTML = (templates[key] || templates.default)();

    // Convert HTML string into DOM elements
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = metaHTML.trim();

    // Append each meta tag to document.head
    Array.from(tempDiv.children).forEach((metaTag) => {
      document.head.appendChild(metaTag);
    });
  }

  function updateMeta(page) {
    document.title = page.title;

    // Select all meta tags in the head of the document
    const metaTags = document.head.querySelectorAll('meta');

    // Remove each meta tag, unless it has one of the specific attributes or names
    metaTags.forEach(tag => {
      const name = tag.getAttribute('name');
      const property = tag.getAttribute('property');
      const httpEquiv = tag.getAttribute('http-equiv');
      const charset = tag.getAttribute('charset');

      const dont_delete = [
        'google-site-verification',
        'viewport',
        'msapplication-TileColor',
        'msapplication-TileImage',
        'theme-color',
        'fb:app_id',
        'og:locale',
        'og:site_name',
        'og:image',
        'twitter:image',
        'twitter:card',
        'medium'
      ]
      
      if (!dont_delete.includes(name) &&
          !dont_delete.includes(property) &&
          !['charset'].includes(charset) &&
          !['X-UA-Compatible'].includes(httpEquiv)) {
        tag.remove();
      }
    });

    if(page.filename.includes('articles')) {
      page['robots'] = 'index,follow'
    }

    // Generate meta tags for each property in page object
    for (const key in page) {
      createMetaTag(page, key)
    }
  }

  let state = reactive({
    page: null,
    pages: window.markdownify.pages.map(prettifyDates),
    articles: window.markdownify.pages.map(prettifyDates).filter(page => page.url.includes('article'))
  })

  const updatePage = () => {

    const path = router.currentRoute.value.path

    state.page = state.pages.find(page => page.url === path)

    if(state.page) {
      state.page = prettifyDates(state.page)
      updateMeta(state.page)
    } 
    else if(path !== '/missing') {
      router.push('/missing')
      state.page = {}
    }
  }

  // Set initial page
  updatePage()

  router.afterEach((to, from) => updatePage());

  trackRouter(router, {
    template(to, from) {
      return {
        page_title: state.page.title,
        page_path: to.path
      }
    }
  });

  return toRefs(state)
});