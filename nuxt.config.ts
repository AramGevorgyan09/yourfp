// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'nuxt-auth-utils'
  ],
  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
  },
  ssr: false,
  nitro: {
    preset: 'github-pages'
  },
  app: {
    head: {
      title: 'YourFP | Choose Your Future Path Here',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/yourfp/square-logo.jpg' }
      ]
    },
    baseURL: '/yourfp/'
  },
  css: ['~/assets/css/main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  }
})