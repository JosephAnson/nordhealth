import type { RouteLocationNormalized } from 'vue-router'
import { mockNuxtImport, registerEndpoint } from '@nuxt/test-utils/runtime'
// @vitest-environment nuxt
import { beforeEach, describe, expect, it, vi } from 'vitest'
import guest from './guest'

// Create mock functions
const { useNavigateToMock } = vi.hoisted(() => {
  return {
    useNavigateToMock: vi.fn(() => {
      return {}
    }),
  }
})

mockNuxtImport('navigateTo', () => {
  return useNavigateToMock
})

function createMockRoute(path: string): RouteLocationNormalized {
  return {
    path,
    name: 'index',
    params: {},
    query: {},
    hash: '',
    fullPath: path,
    matched: [],
    meta: {},
    redirectedFrom: undefined,
  }
}

describe('guest Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should redirect to /success when user is authenticated', async () => {
    registerEndpoint('/api/auth/session', {
      method: 'GET',
      handler: () => ({ authenticated: true }),
    })

    const mockTo = createMockRoute('/guest-route')
    const mockFrom = createMockRoute('/somewhere')

    await guest(mockTo, mockFrom)

    expect(useNavigateToMock).toHaveBeenCalledWith('/success')
  })

  it('should allow access when user is not authenticated', async () => {
    registerEndpoint('/api/auth/session', {
      method: 'GET',
      handler: () => ({ authenticated: false }),
    })

    const mockTo = createMockRoute('/guest-route')
    const mockFrom = createMockRoute('/somewhere')

    const result = await guest(mockTo, mockFrom)

    expect(result).toBeUndefined()
    expect(useNavigateToMock).not.toHaveBeenCalled()
  })
})
