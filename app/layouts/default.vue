<script setup lang="ts">
import '@provetcloud/web-components/lib/Header'
import '@provetcloud/web-components/lib/Footer'
import '@provetcloud/web-components/lib/Button'
import '@provetcloud/web-components/lib/ButtonGroup'
import '@provetcloud/web-components/lib/Icon'
</script>

<template>
  <div class="font-sans bg-background min-h-screen flex flex-col">
    <provet-header>
      <p class="text-l">
        Provet Code Challenge
      </p>

      <DarkToggle slot="end" />
    </provet-header>

    <main class="flex-1 container mx-auto">
      <slot />
    </main>

    <provet-footer>
      © 2025 Joseph Anson - Tech Challenge
    </provet-footer>
  </div>
</template>
