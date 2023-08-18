<script setup>
  import navigation from './components/navigation.vue'
  import foot from './components/foot.vue'
  import consent from './components/consent.vue'
</script>

<template>
  <consent />
  <navigation />
  <router-view />
  <foot />
</template>
