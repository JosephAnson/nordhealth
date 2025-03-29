<script setup lang="ts">
import '@provetcloud/web-components/lib/Icon'

const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <provet-button square variant="plain" size="m" aria-describedby="dark-toggle-tooltip" @click="toggleDark">
    <provet-icon size="m" :name="color.preference === 'dark' ? 'interface-mode-light' : 'interface-mode-dark'" />
  </provet-button>
  <provet-tooltip id="dark-toggle-tooltip">
    Toggle {{ color.preference === 'dark' ? 'light' : 'dark' }} mode
  </provet-tooltip>
</template>
