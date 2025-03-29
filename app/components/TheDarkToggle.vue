<script setup lang="ts">
import '@provetcloud/web-components/lib/Icon'
import '@provetcloud/web-components/lib/Tooltip'
import '@provetcloud/web-components/lib/Button'

const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

const toggleDarkModeLabel = computed(() => color.preference === 'dark' ? 'Toggle light mode' : 'Toggle dark mode')

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <provet-button square variant="plain" size="m" aria-describedby="dark-toggle-tooltip" @click="toggleDark">
    <provet-icon size="m" :name="color.preference === 'dark' ? 'interface-mode-light' : 'interface-mode-dark'" :label="toggleDarkModeLabel" />
  </provet-button>
  <provet-tooltip id="dark-toggle-tooltip">
    {{ toggleDarkModeLabel }}
  </provet-tooltip>
</template>
