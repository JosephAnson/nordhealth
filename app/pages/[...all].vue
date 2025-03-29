<script setup lang="ts">
import '@provetcloud/web-components/lib/EmptyState'
import '@provetcloud/web-components/lib/Stack'
import '@provetcloud/web-components/lib/Button'

useHead({
  title: '404 - Page Not Found',
  meta: [
    {
      name: 'description',
      content: 'The page you are looking for could not be found.',
    },
  ],
})
</script>

<template>
  <BaseContainer>
    <provet-empty-state class="bg-transparent">
      <h1 class="text-xl font-heading">
        Page Not Found
      </h1>
      <div class="text-4xl mb-m">
        <provet-icon name="interface-warning" size="xl" />
      </div>
      <p>The page you are looking for could not be found.</p>
      <provet-stack justify-content="center" gap="s" direction="horizontal">
        <NuxtLink to="/">
          <provet-button variant="primary">
            Back to Home
          </provet-button>
        </NuxtLink>
      </provet-stack>
    </provet-empty-state>
  </BaseContainer>
</template>
