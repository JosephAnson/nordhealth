# Sign-up Application with Provet Cloud Design System

This repository contains a client-side rendered Nuxt 3 application that allows users to sign up for a product using the Provet Cloud Design System components.

- Demo Application - [https://nordhealth.josephanson.com/](https://nordhealth.josephanson.com/)

## Design Decisions

- Introduce a vite plugin to automatically import the Provet Cloud Design System components, this is to improve the developer experience and reduce the amount of code needed to be written. It also reduces the amount of errors that can occur due to missing imports.
- Opted to write tests with playwright over vitest, as I can focus on testing the component and not the implementation details. Unfortunately due to working with web components you're unable to use accessiblity first unit testing tools such as testing library when writing tests with vitest, unless you use some workarounds to access the shadow dom however that requires a lot of extra code and is not always reliable. So it's better to use playwright for this.
- Opted to use TailwindCSS over using the Provet Cloud Design System css directly. This was done to better optimise the final bundle size, as importing the entire design system css would be 39kb and by using tailwind I was able to limit that to only 12kb as I wasn't using a lot of the css file. Also by adding the design system variables to the tailwind config I'm able to get tailwind intellisense which can recommend all the available css-variables in the design system, which improves the developer experience.
- Naming convention for components follows: https://vuejs.org/style-guide/rules-strongly-recommended.html#base-component-names
- No store was used in this application as it doesn't require it, depending on the use case a store could be beneficial to track the authenticated user.
- Implemented a server api to simulate a real-world api, if this was a real application I would factor in different error codes, moving the logic into a service layer.

## Tooling

- 💚 [Nuxt 3](https://nuxt.com/) - Modern Vue framework with SSR capabilities and auto-imports
- ⚡️ [Vite](https://vitejs.dev/) - Next generation frontend tooling with HMR
- 🎨 [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🔒 Form validation with [Vee-Validate](https://vee-validate.logaretm.com/v4/) and [Zod](https://zod.dev/)
- 🎯 [TypeScript](https://www.typescriptlang.org/) - Type safety and enhanced developer experience
- 🎁 [Provet Cloud Design System](https://provetcloud.design/) - Modern web components
- 🌓 Dark/Light mode support via [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)
- 📸 [Playwright](https://playwright.dev/) - E2E, a11y and visual regression testing

## Application Features

- CSR application
- Email and password form with validation
- Password visibility toggle
- Newsletter opt-in checkbox
- Success page after sign-up
- Fully responsive design
- Client-side validation
- Dark/Light mode support
- Implemented server api to simulate a real-world api

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
- `pnpm e2e` - Run end-to-end tests
- `pnpm e2e:ui` - Run end-to-end tests with UI
- `pnpm e2e:update` - Update snapshots
