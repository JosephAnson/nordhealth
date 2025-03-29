<script setup lang="ts">
import '@provetcloud/web-components/lib/Header'
import '@provetcloud/web-components/lib/Footer'
</script>

<template>
  <div class="font-sans bg-background min-h-screen flex flex-col">
    <provet-header>
      <NuxtLink to="/">
        <p class="text-l">
          Provet Code Challenge
        </p>
      </NuxtLink>

      <TheDarkToggle slot="end" />
    </provet-header>

    <main class="flex-1">
      <slot />
    </main>

    <provet-footer>
      © 2025 Joseph Anson - Tech Challenge
    </provet-footer>
  </div>
</template>
