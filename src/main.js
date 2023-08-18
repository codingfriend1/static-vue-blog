import { createApp, nextTick } from 'vue'
import VueGtag from "vue-gtag-next";
import './css/style.scss'
import App from './App.vue'
import router from './router.js'
import { createPinia } from 'pinia'
import { useConfig } from './stores/config-store'
import './js/scripts'

const store = createPinia()

const app = createApp(App)
app.use(router).use(store)

const config = useConfig()

app.use(VueGtag, {
  property: { 
    id: config.googleAnalyticsId,
    params: {
      anonymize_ip: true
    }, 
  },
  useDebugger: false,
  isEnabled: false,
}, router)

router.isReady().then(() => {
  app.mount('#app')
})

document.addEventListener("DOMContentLoaded", function(event) {

  // Mail Chimp Email Subscribe
  (function() {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}());
  // var $mcj = jQuery.noConflict(true);
  // End mc_embed_signup
})