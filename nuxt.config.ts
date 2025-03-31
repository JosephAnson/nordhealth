import tailwindcss from '@tailwindcss/vite'
import provetAutoImport from './vite/plugins/provet-auto-import'

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
        lang: 'en',
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
      isCustomElement: tag => tag.includes('provet-'),
    },
  },

  colorMode: {
    classSuffix: '',
    fallback: 'light',
    preference: 'light',
  },

  routeRules: {
    '/**': { prerender: true },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    typedPages: true,
  },

  compatibilityDate: '2024-08-14',

  vite: {
    plugins: [
      tailwindcss(),
      provetAutoImport(),
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
