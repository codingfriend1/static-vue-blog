// Cheeta Store
import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';

export const useConfig = defineStore('config', () => {

  const state = reactive({
    url: import.meta.env.VITE_URL,
    title: import.meta.env.VITE_TITLE,
    description: import.meta.env.VITE_DESCRIPTION,
    keywords: import.meta.env.VITE_KEYWORDS,
    author: import.meta.env.VITE_AUTHOR,
    authorImage: import.meta.env.VITE_AUTHOR_IMAGE,
    year: parseInt(import.meta.env.VITE_COPYRIGHT_YEAR),
    logo: import.meta.env.VITE_LOGO_URL,
    facebook_id: parseInt(import.meta.env.VITE_FACEBOOK_ID),
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    mailChimpUrl: import.meta.env.VITE_MAILCHIMP_URL
  })

  return toRefs(state)
});