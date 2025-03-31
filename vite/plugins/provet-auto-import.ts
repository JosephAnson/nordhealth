import type { Plugin } from 'vite'

interface ProvetAutoImportOptions {
  /**
   * The package name to import components from
   * @default '@provetcloud/web-components/lib'
   */
  packageName?: string
}

/**
 * A map of Provet component names to their import paths
 */
const PROVET_COMPONENTS = new Map<string, string[]>([
  ['provet-button', ['Button']],
  ['provet-icon', ['Icon']],
  ['provet-tooltip', ['Tooltip']],
  ['provet-input', ['Input']],
  ['provet-stack', ['Stack']],
  ['provet-card', ['Card']],
  ['provet-banner', ['Banner', 'Stack']], // TODO: Fix Banner as it should require Stack automatically this is a bug
  ['provet-checkbox', ['Checkbox']],
  ['provet-divider', ['Divider']],
  ['provet-empty-state', ['EmptyState']],
  ['provet-header', ['Header']],
  ['provet-footer', ['Footer']],
  ['provet-layout', ['Layout']],
  ['provet-navigation', ['Navigation']],
  ['provet-top-bar', ['TopBar']],
  ['provet-avatar', ['Avatar']],
  ['provet-dropdown', ['Dropdown']],
  ['provet-dropdown-item', ['DropdownItem']],
  ['provet-dropdown-group', ['DropdownGroup']],
  ['provet-avatar', ['Avatar']],
  ['provet-visually-hidden', ['VisuallyHidden']],
])

export default function provetAutoImport(options: ProvetAutoImportOptions = {}): Plugin {
  const packageName = options.packageName || '@provetcloud/web-components/lib'

  return {
    name: 'vite:provet-auto-import',
    enforce: 'post',
    transform(code: string, id: string) {
      // Only transform Vue files
      if (!id.includes('.vue')) {
        return null
      }

      // Find all used Provet components in the template
      const usedComponents = new Set<string>()
      for (const [tagName, componentNames] of PROVET_COMPONENTS.entries()) {
        if (code.includes(tagName)) {
          componentNames.forEach(componentName => usedComponents.add(componentName))
        }
      }

      // If no Provet components are used, return the original code
      if (usedComponents.size === 0) {
        return null
      }

      // Generate import statements for used components
      const imports = Array.from(usedComponents)
        .map(component => `import '${packageName}/${component}'`)
        .join('\n')

      // Add imports to the top of the file
      return {
        code: `\n${imports}\n${code}`,
        map: null,
      }
    },
  }
}
