export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth check for public routes
  if (to.path === '/signup' || to.path === '/') {
    return
  }

  // Check session on server
  const { authenticated } = await $fetch('/api/auth/session')

  if (!authenticated) {
    // Redirect to home if not authenticated
    return await navigateTo('/')
  }
})
