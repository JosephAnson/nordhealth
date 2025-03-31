<script setup lang="ts">
import '@provetcloud/web-components/lib/Stack'

definePageMeta({
  middleware: [
    'auth',
  ],
})

const { data: session } = await useFetch('/api/auth/session')
const { signout } = useAuth()
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
    <provet-card class="w-full max-w-[700px] mx-auto">
      <h1 slot="header" class="font-heading">
        Dashboard: Account Created Successfully!
      </h1>

      <provet-banner variant="success" class="flex">
        Account created for email ({{ session.email }}), you're ready to get started.
      </provet-banner>

      <div slot="footer">
        <hr class="divider">

        <provet-button
          variant="primary"
          size="l"
          expand
          class="mt-m"
          @click="signout"
        >
          Sign out
          <provet-icon slot="end" name="arrow-right" />
        </provet-button>
      </div>
    </provet-card>
  </BaseContainer>
</template>
