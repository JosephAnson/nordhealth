<script setup lang="ts">
const router = useRouter()

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
      <provet-button href="#" variant="primary" @click.prevent="router.push('/')">
        Retry
      </provet-button>
    </provet-stack>
  </provet-empty-state>
</template>
