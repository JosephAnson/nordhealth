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
  <button class="!outline-none" @click="toggleDark">
    <provet-icon :name="color.preference === 'dark' ? 'interface-mode-light' : 'interface-mode-dark'" />
  </button>
</template>
