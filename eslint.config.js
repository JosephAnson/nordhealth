// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    formatters: true,
    pnpm: true,
  },
  {
    rules: {
      'vue/no-deprecated-slot-attribute': 'off',
    },
  },
)
  .append(nuxt())
