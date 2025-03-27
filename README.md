# Sign-up Application with Provet Cloud Design System

This repository contains a client-side rendered Nuxt 3 application that allows users to sign up for a product using the Provet Cloud Design System components.

## Features

- 💚 [Nuxt 3](https://nuxt.com/) - Modern Vue framework with SSR capabilities and auto-imports
- ⚡️ [Vite](https://vitejs.dev/) - Next generation frontend tooling with HMR
- 🎨 [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🔒 Form validation with [Vee-Validate](https://vee-validate.logaretm.com/v4/) and [Zod](https://zod.dev/)
- 🎯 [TypeScript](https://www.typescriptlang.org/) - Type safety and enhanced developer experience
- 🎁 [Provet Cloud Design System](https://provetcloud.design/) - Modern web components
- 📦 [VueUse](https://vueuse.org/) - Collection of Vue Composition API utilities
- 🌓 Dark/Light mode support via [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)
- 🛠️ [Nuxt DevTools](https://devtools.nuxtjs.org/) - Enhanced developer experience

## Application Features

- Email and password form with validation
- Password visibility toggle
- Newsletter opt-in checkbox
- Success page after sign-up
- Fully responsive design
- Client-side validation
- Dark/Light mode support

## Tech Stack Details

### Core Framework

- **[Nuxt 3](https://nuxt.com/)**: Modern Vue framework providing:
  - File-based routing
  - Auto-import of components
  - Built-in development tools
  - TypeScript support
  - Server-side rendering capabilities

### UI Components

- **[Provet Cloud Design System](https://provetcloud.design/)**: Web components including:
  - `nord-input`: Form input fields
  - `nord-checkbox`: Checkbox components
  - `nord-button`: Button components
  - `nord-typography`: Typography components
  - `nord-card`: Card containers

### Styling and Design

- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)**: Dark/Light mode support

### Form Handling

- **[Vee-Validate](https://vee-validate.logaretm.com/v4/)**: Form validation
- **[Zod](https://zod.dev/)**: Schema validation with TypeScript integration

### Development Tools

- **[TypeScript](https://www.typescriptlang.org/)**: Static typing
- **[Vite](https://vitejs.dev/)**: Build tooling and dev server
- **[ESLint](https://eslint.org/)**: Code linting
- **[Nuxt DevTools](https://devtools.nuxtjs.org/)**: Development utilities

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run development server:
   ```bash
   pnpm dev
   ```
4. Build for production:
   ```bash
   pnpm build
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm start` - Start production server
- `pnpm start:generate` - Serve generated static site
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

## Design Decisions

- Opted to use TailwindCSS over using the Provet Cloud Design System css directly. This was done to better optimise the final bundle size, as importing the entire design system css would increase the final bundle size by 100kb and with tailwind you can limit that to the components you use.
