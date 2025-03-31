<script setup lang="ts">
useHead({
  title: 'Account Created Successfully',
  meta: [
    {
      name: 'description',
      content: 'Your account has been successfully created. Welcome to Provet Cloud!',
    },
  ],
})
</script>

<template>
  <BaseContainer>
    <provet-card class="w-full max-w-[700px] mx-auto mt-l m:mt-xxl">
      <h1 slot="header" class="font-heading">
        Account Created Successfully!
      </h1>

      <provet-banner variant="success" class="mb-l">
        Your account has been created and you're ready to get started.
      </provet-banner>

      <div class="flex flex-col gap-m mt-m">
        <NuxtLink to="/">
          <provet-button
            variant="primary"
            size="l"
            expand
          >
            Continue to Dashboard
            <provet-icon slot="end" name="arrow-right" />
          </provet-button>
        </NuxtLink>
      </div>
    </provet-card>
  </BaseContainer>
</template>
