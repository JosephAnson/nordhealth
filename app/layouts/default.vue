<script setup lang="ts">
import '@provetcloud/web-components/lib/Header'
import '@provetcloud/web-components/lib/Footer'
import '@provetcloud/web-components/lib/Icon'
import '@provetcloud/web-components/lib/Tooltip'
</script>

<template>
  <div class="font-sans bg-background min-h-screen flex flex-col">
    <BaseSkipLink />
    <provet-header>
      <NuxtLink to="/">
        <p class="text-l">
          Provet Code Challenge
        </p>
      </NuxtLink>

      <div slot="end" class="flex items-center gap-m">
        <NuxtLink target="_blank" to="https://github.com/JosephAnson/nordhealth">
          <provet-button square variant="plain" size="m" aria-describedby="github-tooltip">
            <provet-icon name="generic-github" size="m" label="View the code on GitHub" />
          </provet-button>
          <provet-tooltip id="github-tooltip">
            View the code on GitHub
          </provet-tooltip>
        </NuxtLink>
        <TheDarkToggle />
      </div>
    </provet-header>

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <provet-footer>
      © 2025 Joseph Anson - Tech Challenge
    </provet-footer>
  </div>
</template>
