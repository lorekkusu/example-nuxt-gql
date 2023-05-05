// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://demo.saleor.io/graphql/'
      }
    },
  },
})
