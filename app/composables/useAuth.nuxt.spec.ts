import type { $Fetch } from 'nitropack'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useAuth } from './useAuth'

const mockPush = vi.fn()

const { useFetchMock } = vi.hoisted(() => {
  return {
    useFetchMock: vi.fn(() => ({
      data: ref({ authenticated: false }),
      refresh: vi.fn(),
    })),
  }
})

mockNuxtImport('useFetch', () => useFetchMock)
mockNuxtImport('useRouter', () => () => ({
  push: mockPush,
}))

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset global $fetch mock
    globalThis.$fetch = vi.fn() as unknown as $Fetch
  })

  it('should handle signout correctly', async () => {
    const mockRefresh = vi.fn()

    // Setup useFetch mock for this test
    useFetchMock.mockImplementationOnce(() => ({
      data: ref({ authenticated: false }),
      refresh: mockRefresh,
    }))

    // Setup $fetch mock for signout
    globalThis.$fetch = vi.fn().mockImplementationOnce(async (url, options) => {
      await options.onResponse()
      options.finally()
      return { success: true }
    }) as unknown as $Fetch

    const { signout, loading } = useAuth()
    await signout()

    expect(globalThis.$fetch).toHaveBeenCalledWith('/api/auth/signout', expect.any(Object))
    expect(mockPush).toHaveBeenCalledWith('/')
    expect(mockRefresh).toHaveBeenCalled()
    expect(loading.value).toBe(false)
  })

  it('should handle signup correctly', async () => {
    const mockRefresh = vi.fn()

    // Setup useFetch mock for this test
    useFetchMock.mockImplementationOnce(() => ({
      data: ref({ authenticated: false }),
      refresh: mockRefresh,
    }))

    const { signup, loading } = useAuth()
    const testEmail = 'test@example.com'
    const testPassword = 'password123'
    const testReceiveUpdates = true

    // Mock successful signup
    globalThis.$fetch = vi.fn().mockImplementationOnce(async (url, options) => {
      await options.onResponse()
      options.finally()
      return { success: true }
    }) as unknown as $Fetch

    await signup(testEmail, testPassword, testReceiveUpdates)

    expect(globalThis.$fetch).toHaveBeenCalledWith('/api/auth/signup', {
      method: 'POST',
      body: {
        email: testEmail,
        password: testPassword,
        receiveUpdates: testReceiveUpdates,
      },
      onResponse: expect.any(Function),
      onRequestError: expect.any(Function),
      finally: expect.any(Function),
    })
    expect(mockPush).toHaveBeenCalledWith('/success')
    expect(mockRefresh).toHaveBeenCalled()
    expect(loading.value).toBe(false)
  })

  it('should handle signup error correctly', async () => {
    const mockRefresh = vi.fn()

    // Setup useFetch mock for this test
    useFetchMock.mockImplementationOnce(() => ({
      data: ref({ authenticated: false }),
      refresh: mockRefresh,
    }))

    const { signup, loading } = useAuth()

    // Mock failed signup
    globalThis.$fetch = vi.fn().mockImplementationOnce(async (url, options) => {
      await options.onRequestError()
      options.finally()
      throw new Error('Signup failed')
    }) as unknown as $Fetch

    await signup('test@example.com', 'password123')

    expect(mockPush).toHaveBeenCalledWith('/error')
    expect(loading.value).toBe(false)
  })

  it('should compute authentication state correctly', async () => {
    // Mock authenticated session
    useFetchMock.mockImplementationOnce(() => ({
      data: ref({ authenticated: true }),
      refresh: vi.fn(),
    }))

    const { isAuthenticated } = useAuth()
    await nextTick()
    expect(isAuthenticated.value).toBe(true)
  })

  it('should compute user initials correctly', async () => {
    // Mock session with email
    useFetchMock.mockImplementationOnce(() => ({
      data: ref({ authenticated: true, email: 'test@example.com' }),
      refresh: vi.fn(),
    }))

    const { usersInitials } = useAuth()
    await nextTick()
    expect(usersInitials.value).toBe('T')
  })
})
