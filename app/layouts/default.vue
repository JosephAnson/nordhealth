<script setup lang="ts">
import '@provetcloud/web-components/lib/Header'
import '@provetcloud/web-components/lib/Footer'
import '@provetcloud/web-components/lib/Icon'
</script>

<template>
  <div class="font-sans bg-background min-h-screen flex flex-col">
    <provet-header>
      <NuxtLink to="/">
        <p class="text-l">
          Provet Code Challenge
        </p>
      </NuxtLink>

      <div slot="end" class="flex items-center gap-l">
        <NuxtLink target="_blank" to="https://github.com/JosephAnson/nordhealth">
          <provet-icon name="generic-github" />
        </NuxtLink>
        <TheDarkToggle />
      </div>
    </provet-header>

    <main class="flex-1">
      <slot />
    </main>

    <provet-footer>
      © 2025 Joseph Anson - Tech Challenge
    </provet-footer>
  </div>
</template>
