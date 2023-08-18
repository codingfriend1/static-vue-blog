<script setup>
  import { storeToRefs } from 'pinia'
  import { useConfig } from '../stores/config-store.js'
  import { useMarkdownifyStore } from '../stores/markdownify-store.js'

  const config = useConfig()
  const { page, pages } = storeToRefs(useMarkdownifyStore())
</script>

<template>
  <address>
    <div id="post-avatar">
      <img :src="config.authorImage" :alt="page.author || config.author" />
    </div>
    <div id="author-and-time">
      <div>
        <router-link to="/about" rel="author"> By {{page.author || config.author}}</router-link>
      </div>
      <div>
        <time v-if="page.url.includes('article')" :datetime="page.createdAt"> {{page.createdAtPrettified}} &#x2022; {{page.readingTime}} min read</time>
      </div>
    </div>
  </address>
</template>