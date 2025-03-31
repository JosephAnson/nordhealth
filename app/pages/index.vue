<script setup lang="ts">
const { isAuthenticated } = useAuth()
const router = useRouter()
useHead({
  title: 'Redefining digital healthcare',
  titleTemplate: 'NordHealth | %s',
  meta: [
    { name: 'description', content: 'Redefining digital healthcare' },
  ],
})
</script>

<template>
  <BaseContainer>
    <provet-card>
      <div slot="header">
        <h1>Home</h1>
      </div>

      <div slot="footer">
        <provet-button v-if="!isAuthenticated" expand variant="primary" href="#" @click.prevent="router.push('/signup')">
          Sign up
        </provet-button>

        <provet-button v-else expand variant="primary" href="#" @click.prevent="router.push('/success')">
          Dashboard
        </provet-button>
      </div>
    </provet-card>
  </BaseContainer>
</template>
