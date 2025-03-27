import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
  ],
  ssr: false,

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      htmlAttrs: {
        class: 'n-reset',
      },
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nordhealth Sign Up' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  css: ['~/assets/css/tailwind.css'],

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('-'),
    },
  },

  colorMode: {
    classSuffix: '',
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-08-14',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
})
