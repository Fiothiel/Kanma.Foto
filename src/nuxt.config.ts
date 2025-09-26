import { defineNuxtConfig } from "nuxt/config";

console.log('token?', process.env.STORYBLOK_TOKEN);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@storyblok/nuxt'],
  css: ["@/assets/scss/main.scss"],

  runtimeConfig: {
    storyblokToken: process.env.STORYBLOK_TOKEN,
  },

  storyblok: {
    accessToken: process.env.STORYBLOK_TOKEN,
    apiOptions: {
      region: 'eu',
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  },
},
})
