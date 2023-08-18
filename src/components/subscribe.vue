<script setup>
  import { useConfig } from '../stores/config-store.js'
  const config = useConfig()
</script>

<template>
  <form id="mc-embedded-subscribe-form" :action="config.mailChimpUrl" method="post" name="mc-embedded-subscribe-form" target="_blank" novalidate="">
    <section id="mc_embed_signup_scroll">
      <header>
        <p class="h3">Do you like our material?</p>
        <p>Stay informed by subscribing to our latest posts</p>
      </header>
      <section>
        <label for="mce-EMAIL">Email Address:</label>
        <input type="email" id="mce-EMAIL" name="EMAIL" placeholder="Your email" required />
      </section>
      <section id="mce-responses">
        <div id="mce-error-response" style="display:none"></div>
        <div id="mce-success-response" style="display:none"></div>
      </section>
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="" tabindex="-1" value=""/>
      </div>
      <section>
        <input type="submit" value="Subscribe" name="subscribe"/>
      </section>
    </section>
  </form>
</template>