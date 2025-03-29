<script setup lang="ts">
import '@provetcloud/web-components/lib/EmptyState'
import '@provetcloud/web-components/lib/Stack'
import '@provetcloud/web-components/lib/Button'

useHead({
  title: 'Error - Something Went Wrong',
  meta: [
    {
      name: 'description',
      content: 'An error occurred while processing your request. Please try again.',
    },
  ],
})
</script>

<template>
  <provet-empty-state class="bg-transparent">
    <h1 class="text-xl font-heading">
      Something's wrong
    </h1>
    <p>Looks like something went wrong. Click Retry to try again.</p>

    <provet-stack justify-content="center" gap="s" direction="horizontal">
      <NuxtLink to="/">
        <provet-button variant="primary">
          Retry
        </provet-button>
      </NuxtLink>
    </provet-stack>
  </provet-empty-state>
</template>
