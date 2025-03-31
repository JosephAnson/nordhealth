<script setup lang="ts">
const { isAuthenticated, signout, session, usersInitials } = useAuth()
const router = useRouter()
</script>

<template>
  <div class="font-sans bg-background min-h-screen flex flex-col">
    <BaseSkipLink />
    <provet-header>
      <NuxtLink to="/">
        <p class="text-l">
          NordHealth
        </p>
      </NuxtLink>

      <div slot="end" class="flex items-center gap-s m:gap-m">
        <TheColorModeToggle />

        <provet-button v-if="!isAuthenticated" href="#" variant="primary" @click.prevent="router.push('/signup')">
          Sign up
        </provet-button>

        <template v-else>
          <provet-dropdown>
            <provet-button slot="toggle" variant="plain" aria-describedby="user-tooltip">
              <provet-avatar :name="session?.email">
                {{ usersInitials }}
              </provet-avatar>
            </provet-button>
            <provet-avatar slot="header" size="s" :name="session?.email">
              {{ usersInitials }}
            </provet-avatar>
            <p slot="header" class="n-color-text-weak n-font-size-s">
              Signed in as <span class="n-font-weight-active">{{ session?.email }}</span>
            </p>
            <provet-dropdown-group class="px-s">
              <provet-dropdown-item @click="signout">
                Sign out
                <provet-icon slot="end" name="interface-logout" />
              </provet-dropdown-item>
            </provet-dropdown-group>
          </provet-dropdown>
          <provet-tooltip id="user-tooltip" class="w-[200px]" position="block-end">
            User ({{ session?.email }})
          </provet-tooltip>
        </template>
      </div>
    </provet-header>

    <main id="main-content" class="flex-1 my-l m:my-xxl">
      <slot />
    </main>

    <provet-footer>
      <div class="flex w-full items-center justify-between">
        <provet-button target="_blank" href="https://github.com/JosephAnson/nordhealth" square variant="plain" size="m">
          <provet-icon name="generic-github" size="m" />
          <provet-visually-hidden>
            View the code on GitHub
          </provet-visually-hidden>
        </provet-button>
        <p>
          © 2025 Joseph Anson - Tech Challenge
        </p>
      </div>
    </provet-footer>
  </div>
</template>
