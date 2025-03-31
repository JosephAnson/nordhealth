<script setup lang="ts">
const color = useColorMode()

type Modes = 'light' | 'lightHighContrast' | 'dark' | 'darkHighContrast'

const themes: Record<Modes, string> = {
  light: 'https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet.css',
  lightHighContrast: 'https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet-high-contrast.css',
  dark: 'https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet-dark.css',
  darkHighContrast: 'https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet-dark-high-contrast.css',
}

const isDark = ref(color.value === 'dark' || color.value === 'darkHighContrast')
const isHighContrast = ref(color.value === 'lightHighContrast' || color.value === 'darkHighContrast')

const darkModeLabel = computed(() => isDark.value ? 'Switch to light mode' : 'Switch to dark mode')
const contrastModeLabel = computed(() => isHighContrast.value ? 'Switch to normal contrast' : 'Switch to high contrast')

function toggleDark() {
  isDark.value = !isDark.value
  setColorMode()
}

function toggleContrast() {
  isHighContrast.value = !isHighContrast.value
  setColorMode()
}

function setColorMode() {
  if (isDark.value) {
    color.preference = !isHighContrast.value ? 'dark' : 'darkHighContrast'
  }
  else {
    color.preference = !isHighContrast.value ? 'light' : 'lightHighContrast'
  }
}

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' || color.value === 'darkHighContrast' ? '#222222' : '#ffffff',
  }],
  link: [{
    rel: 'stylesheet',
    href: () => themes[color.preference as Modes],
  }],
})
</script>

<template>
  <provet-dropdown>
    <provet-button title="Interface options" slot="toggle" variant="plain" aria-describedby="color-mode-tooltip">
      <provet-icon size="m" name="navigation-settings" />
      <provet-visually-hidden>
        Interface options
      </provet-visually-hidden>
    </provet-button>
    <div slot="header">
      Interface options
    </div>
    <provet-dropdown-group class="px-s">
      <provet-dropdown-item @click="toggleDark">
        {{ darkModeLabel }}
        <provet-icon slot="end" aria-hidden="true" :name="isDark ? 'interface-mode-light' : 'interface-mode-dark'" />
      </provet-dropdown-item>
      <provet-dropdown-item @click="toggleContrast">
        {{ contrastModeLabel }}
        <provet-icon slot="end" aria-hidden="true" :name="isHighContrast ? 'interface-partially-complete-small' : 'interface-complete-small'" />
      </provet-dropdown-item>
    </provet-dropdown-group>
  </provet-dropdown>
  <provet-tooltip id="color-mode-tooltip">
    Interface options
  </provet-tooltip>
</template>
