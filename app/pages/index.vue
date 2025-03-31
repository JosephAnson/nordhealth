<script setup lang="ts">
const { isAuthenticated } = useAuth()
</script>

<template>
  <BaseContainer>
    <provet-card>
      <div slot="header">
        <h1>Home</h1>
      </div>

      <div slot="footer">
        <NuxtLink v-if="!isAuthenticated" to="/signup">
          <provet-button expand variant="primary">
            Sign up
          </provet-button>
        </NuxtLink>

        <NuxtLink v-else to="/success">
          <provet-button expand variant="primary">
            Dashboard
          </provet-button>
        </NuxtLink>
      </div>
    </provet-card>
  </BaseContainer>
</template>
