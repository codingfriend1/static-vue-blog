<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue';
import comment from '../components/comment.vue'
import subscribe from '../components/subscribe.vue'
import authorAvatar from '../components/author-avatar.vue'
import { useMarkdownifyStore } from '../stores/markdownify-store.js'
import { useScrollTracking } from '../stores/scroll-tracking-store.js'
import('../js/mailchimp.min.js')

const { page, pages } = storeToRefs(useMarkdownifyStore())
const { postBodyEl } = storeToRefs(useScrollTracking())

const isArticle = computed(() => page.value.url.includes('article'))

</script>

<template>
  <main :key="page.url">

    <header>
      <author-avatar v-if="isArticle" />
      <h1>{{page.title}}</h1>
    </header>

    <article v-html="page.html" ref="postBodyEl"></article>

    <footer v-if="isArticle">
      <comment />
      <subscribe />
    </footer>

  </main>
</template>