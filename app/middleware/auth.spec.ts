import type { RouteLocationNormalized } from 'vue-router'
import { mockNuxtImport, registerEndpoint } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import auth from './auth'

// Create mock functions
const { useNavigateToMock } = vi.hoisted(() => {
  return {
    useNavigateToMock: vi.fn(() => {
      return { }
    }),
  }
})

mockNuxtImport('navigateTo', () => useNavigateToMock)

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

describe('auth Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should allow access to public routes without authentication', async () => {
    const mockTo = createMockRoute('/')
    const mockFrom = createMockRoute('/somewhere')
    const result = await auth(mockTo, mockFrom)
    expect(result).toBeUndefined()
  })

  it('should allow access to signup route without authentication', async () => {
    const mockTo = createMockRoute('/signup')
    const mockFrom = createMockRoute('/somewhere')
    const result = await auth(mockTo, mockFrom)
    expect(result).toBeUndefined()
  })

  it('should redirect to home when user is not authenticated', async () => {
    registerEndpoint('/api/auth/session', {
      method: 'GET',
      handler: () => ({ authenticated: false }),
    })

    const mockTo = createMockRoute('/protected-route')
    const mockFrom = createMockRoute('/somewhere')

    await auth(mockTo, mockFrom)

    expect(useNavigateToMock).toHaveBeenCalledWith('/')
  })

  it('should allow access when user is authenticated', async () => {
    registerEndpoint('/api/auth/session', {
      method: 'GET',
      handler: () => ({ authenticated: true }),
    })

    const mockTo = createMockRoute('/protected-route')
    const mockFrom = createMockRoute('/somewhere')

    const result = await auth(mockTo, mockFrom)

    expect(result).toBeUndefined()
    expect(useNavigateToMock).not.toHaveBeenCalled()
  })
})
