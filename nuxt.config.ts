// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap' }],
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css",
          rel: "stylesheet",
          integrity: "sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx",
          crossorigin: "anonymous"
        }
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
          integrity: "sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa",
          crossorigin: "anonymous"
        }
      ],
    }
  },
  modules: [
    'nuxt-rating',
    'nuxt-icon',
    '@pinia/nuxt',
    'nuxt3-notifications'
  ],
  css: ['~/assets/css/custom.css'],
  nuxtIcon: {
    size: '24px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    aliases: {
      'nuxt': 'logos:nuxt-icon',
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  devtools: { enabled: true }
})