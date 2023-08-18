<script setup>
import router from '../router.js'
import { useMarkdownifyStore } from '../stores/markdownify-store.js'
const markdownify = useMarkdownifyStore()
</script>

<template>
  <main id="home-page">
    <section v-html="markdownify.page.html"></section>
    <div id="teasers">
      <section class="article-teaser" v-for="page in markdownify.articles" :key="page.url">
        <figure v-if="page.thumbnail">
          <router-link :to="page.url" role="menuitem">
            <img :src="page.thumbnail" :alt="page.alt"/>
          </router-link>
        </figure>
        <article>
          <header>
            <router-link :to="page.url">
              <h3>{{page.title}}</h3>
            </router-link>
            <time :datetime="page.createdAtPrettified">{{page.createdAtPrettified}}</time><span> - {{page.readingTime}} min read</span>
          </header>
          <section v-html="page.description"></section>
          <footer>
            <router-link :to="page.url" class="read-more-button">Read more</router-link>
          </footer>
        </article>
      </section>
    </div>
  </main>
</template>
