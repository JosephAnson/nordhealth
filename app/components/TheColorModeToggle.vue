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
  <div class="flex gap-m">
    <provet-button square variant="plain" size="m" aria-describedby="dark-toggle-tooltip" @click="toggleDark">
      <provet-icon size="m" :name="isDark ? 'interface-mode-light' : 'interface-mode-dark'" :label="darkModeLabel" />
    </provet-button>
    <provet-tooltip id="dark-toggle-tooltip">
      {{ darkModeLabel }}
    </provet-tooltip>

    <provet-button square variant="plain" size="m" aria-describedby="contrast-toggle-tooltip" @click="toggleContrast">
      <provet-icon size="m" :name="isHighContrast ? 'interface-partially-complete-small' : 'interface-complete-small'" :label="contrastModeLabel" />
    </provet-button>
    <provet-tooltip id="contrast-toggle-tooltip">
      {{ contrastModeLabel }}
    </provet-tooltip>
  </div>
</template>
