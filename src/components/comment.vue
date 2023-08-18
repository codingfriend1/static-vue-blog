<script setup>
import { ref, onUpdated, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMarkdownifyStore } from '../stores/markdownify-store';
import { useConfig } from '../stores/config-store'

const config = useConfig()

/**
 * We only want to enable facebook comments if we are client-side and we haven't already initialized this script
 */
if (!window.fbAsyncInit) {

    /**
     * If you run `enableComments()` in your code it will download the remote facebook script to enable facebook comments and likes on your pages
     */
    window.enableComments = function() {
        (function(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/all.js";
            js.crossorigin = "anonymous";

            if (d.getElementById(id)) {
                //if <script id="facebook-jssdk"> exists
                delete window.FB;
                fjs.parentNode.replaceChild(js, fjs);
            } else {
                fjs.parentNode.insertBefore(js, fjs);
            }
        })(document, "script", "facebook-jssdk");

        window.fbAsyncInit = function() {
            if (typeof FB != "undefined" && FB != null) {
                FB.init({
                    appId: config.facebook_id, //App ID from the app dashboard
                    status: true, //Check Facebook Login status
                    xfbml: true //Look for social plugins on the page
                });
            }
        };
    }
}

const commentsEnabled = ref(false); // replacing data property

const loadComments = () => {
  window.enableComments();
  commentsEnabled.value = !commentsEnabled.value
  setTimeout(() => {
    if (window.fbAsyncInit) {
      window.fbAsyncInit();
    }
  }, 100);
};

onUpdated(() => {
  if(commentsEnabled.value) {
    if (window.fbAsyncInit) {
      window.fbAsyncInit();
    }
  }
});

onMounted(() => {
  if(commentsEnabled.value) {
    setTimeout(() => {
      if (window.fbAsyncInit) {
        window.fbAsyncInit();
      }
    }, 250);
  }
});

const { page } = storeToRefs(useMarkdownifyStore())

</script>
<template>
  <section id="comments">

    <div class="text-center">
      <p class="h4">Do you like this article? Let us know</p>
      <div class="fb-like" :data-href="page.absolute_url" data-layout="button_count" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>
    </div>

    <article v-if="commentsEnabled">
      <header>
        <p class="h3">Join the conversation</p>
      </header>
      <section class="fb-comments" :data-href="page.absolute_url" data-numposts="5" data-width="100%"></section>
    </article>

    <aside class="text-center" v-else>
      <button @click="loadComments">Load comments</button>
    </aside>
    
  </section>
</template>