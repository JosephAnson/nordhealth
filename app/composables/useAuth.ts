export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const { data: session, refresh } = useFetch('/api/auth/session')

  const isAuthenticated = computed(() => session.value?.authenticated ?? false)
  const usersInitials = computed(() => session.value?.email[0].toUpperCase())

  async function signout() {
    loading.value = true
    await $fetch(
      '/api/auth/signout',
      {
        method: 'POST',
        async onResponse() {
          await router.push('/')
          refresh()
        },
        finally() {
          loading.value = false
        },
      },
    )
  }

  function signup(email: string, password: string, receiveUpdates: boolean = false) {
    loading.value = true

    $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        email,
        password,
        receiveUpdates,
      },
      async onResponse() {
        refresh()
        router.push('/success')
      },
      onRequestError() {
        router.push('/error')
      },
      finally() {
        loading.value = false
      },
    })
  }

  return {
    session,
    isAuthenticated,
    usersInitials,
    signout,
    signup,
    loading,
  }
}
