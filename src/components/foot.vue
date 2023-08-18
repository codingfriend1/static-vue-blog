<script setup>
  import { ref } from 'vue'
  import { useConfig } from '../stores/config-store.js'
  const config = useConfig()
</script>

<template>
  <footer id="site-footer">
    <span>
      &copy;
      <time :datetime="config.year">{{config.year}}</time>
    </span>
    
    <address>
      <router-link to="/about" rel="author">{{" " + config.author}}</router-link>
    </address> 
    {{config.title}}
  </footer>
</template>