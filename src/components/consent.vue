<script setup>
  import { ref, onMounted } from 'vue'
  import { useState } from "vue-gtag-next";
  import { useConfig } from '../stores/config-store'

  const { isEnabled } = useState()

  const cookieConsent = ref(null)

  onMounted(async () => {
    const config = useConfig()

    if(typeof localStorage !== 'undefined' && config.googleAnalyticsId) {
      let consent = localStorage.getItem('no-cookie-consent')
      if(!consent) {
        cookieConsent.value.style.display = 'flex'
      }

      if(consent === 'true') {
        window.allowCookies = true
        isEnabled.value = true
      } else if(consent === 'false') {
        window.allowCookies = false
        isEnabled.value = false
      } else {
        window.allowCookies = undefined
      }
    }
  })

  // Opt-out function
  window.toggleTracking = function toggleTracking(bool) {

    if(typeof window.allowCookies === 'undefined') {
      window.allowCookies = true
    }

    window.allowCookies = typeof bool === 'boolean' ? bool : !window.allowCookies

    localStorage.setItem('no-cookie-consent', window.allowCookies)

    if(cookieConsent) {
      cookieConsent.value.style.display = 'none'
    }
    
    if(window.allowCookies) {
      isEnabled.value = true
      if(typeof bool !== 'boolean') {
        alert(`You have re-enabled Google Analytics data collection. This data will be collected.`);
      }
    } else {
      isEnabled.value = false
      alert(
        "Google Analytics data will not be collected on you on this site."
      );

      // Delete all existing cookies
      document.cookie
        .split(";")
        .forEach(function(c) { 
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date()
            .toUTCString() + 
            ";path=/"); 
        });
    }
  };

  function enableTracking() {
    window.toggleTracking(true)
  }

  function disableTracking() {
    window.toggleTracking(false)
  }
</script>

<template>
  <aside id="cookieConsent" ref="cookieConsent">
    <div>
      <p class="h3">We use analytics.</p>
      <p>By continuing to visit this site you agree to our use of cookies. <router-link class="no-border" to="/privacy-policy">Learn more</router-link></p>
    </div>
    <div id="cookie-buttons">
      <button @click="enableTracking()">Accept & Close</button>
      <button @click="disableTracking()">No Thanks!</button>
    </div>
  </aside>
</template>