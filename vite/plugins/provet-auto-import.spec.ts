import { describe, expect, it } from 'vitest'
import provetAutoImport from './provet-auto-import'

describe('provetAutoImport', () => {
  const plugin = provetAutoImport()

  it('should ignore non-Vue files', () => {
    const result = plugin.transform('const x = 1;', 'file.ts')
    expect(result).toBeNull()
  })

  it('should ignore Vue files with no Provet components', () => {
    const code = `
      <template>
        <div>Hello World</div>
      </template>
    `
    const result = plugin.transform(code, 'Component.vue')
    expect(result).toBeNull()
  })

  it('should add imports for used Provet components', () => {
    const code = `
      <template>
        <provet-button>Click me</provet-button>
        <provet-icon name="test" />
      </template>
    `
    const result = plugin.transform(code, 'Component.vue')

    expect(result).toEqual({
      code: expect.stringContaining('import \'@provetcloud/web-components/lib/Button\''),
      map: null,
    })
    expect(result?.code).toContain('import \'@provetcloud/web-components/lib/Icon\'')
  })

  it('should handle components with multiple dependencies', () => {
    const code = `
      <template>
        <provet-banner>Warning message</provet-banner>
      </template>
    `
    const result = plugin.transform(code, 'Component.vue')

    expect(result?.code).toContain('import \'@provetcloud/web-components/lib/Banner\'')
    expect(result?.code).toContain('import \'@provetcloud/web-components/lib/Stack\'')
  })

  it('should not duplicate imports for multiple instances of the same component', () => {
    const code = `
      <template>
        <provet-button>Button 1</provet-button>
        <provet-button>Button 2</provet-button>
      </template>
    `
    const result = plugin.transform(code, 'Component.vue')

    const importCount = (result?.code.match(/import '@provetcloud\/web-components\/lib\/Button'/g) || []).length
    expect(importCount).toBe(1)
  })

  it('should respect custom package name option', () => {
    const customPlugin = provetAutoImport({ packageName: '@custom/package' })
    const code = `
      <template>
        <provet-button>Click me</provet-button>
      </template>
    `
    const result = customPlugin.transform(code, 'Component.vue')

    expect(result?.code).toContain('import \'@custom/package/Button\'')
  })

  it('should preserve original code after imports', () => {
    const originalCode = `
      <template>
        <provet-button>Click me</provet-button>
      </template>
    `
    const result = plugin.transform(originalCode, 'Component.vue')

    expect(result?.code).toContain(originalCode)
  })

  it('should handle multiple components in complex templates', () => {
    const code = `
      <template>
        <provet-card>
          <provet-stack>
            <provet-input />
            <provet-button>
              <provet-icon name="test" />
            </provet-button>
          </provet-stack>
        </provet-card>
      </template>
    `
    const result = plugin.transform(code, 'Component.vue')

    expect(result?.code).toContain('import \'@provetcloud/web-components/lib/Card\'')
    expect(result?.code).toContain('import \'@provetcloud/web-components/lib/Stack\'')
    expect(result?.code).toContain('import \'@provetcloud/web-components/lib/Input\'')
    expect(result?.code).toContain('import \'@provetcloud/web-components/lib/Button\'')
    expect(result?.code).toContain('import \'@provetcloud/web-components/lib/Icon\'')
  })
})
