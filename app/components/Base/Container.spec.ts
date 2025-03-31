import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import Container from './Container.vue'

describe('container', () => {
  it('renders with slot content', async () => {
    const SLOT_CONTENT = 'Test Content'

    await renderSuspended(Container, {
      slots: {
        default: () => h('div', {}, SLOT_CONTENT),
      },
    })

    const slotText = screen.getByText(SLOT_CONTENT)
    expect(slotText).toBeInTheDocument()
  })
})
