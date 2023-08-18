<script setup>
  import { useConfig } from '../stores/config-store.js'
  const config = useConfig()
</script>

<template>
  <section>
    <header>
      <figure id="site-banner"> <!-- Replace with your background image path -->
        <figcaption>
          <picture v-if="config.logo">
            <source :srcset="config.logo.replace('.png', '.webp')" type="image/webp"/>
            <source :srcset="config.logo" type="image/jpeg"/>
            <img :src="config.logo" title="Logo" alt="Site Logo"/>
          </picture>
          <p class="h1" id="site-title">
            <router-link to="/" rel="home">{{config.title}}</router-link>
          </p>
          <p>{{config.description}}</p>
        </figcaption>
      </figure>
    </header>
    <nav>
      <ul role="menubar">
        <li role="none">
          <router-link exact to="/" role="menuitem">Home</router-link>
        </li>
        <li role="none">
          <router-link exact to="/about" role="menuitem">About</router-link>
        </li>
        <li role="none">
          <router-link exact to="/privacy-policy" role="menuitem">Privacy Policy</router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>
