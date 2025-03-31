export default defineNuxtRouteMiddleware(async () => {
  const { authenticated } = await $fetch('/api/auth/session')

  if (authenticated) {
    return navigateTo('/success')
  }
})
