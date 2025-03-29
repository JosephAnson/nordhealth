<script setup lang="ts">
import '@provetcloud/web-components/lib/Layout'
import '@provetcloud/web-components/lib/Navigation'
import '@provetcloud/web-components/lib/TopBar'
import '@provetcloud/web-components/lib/Card'
import '@provetcloud/web-components/lib/Banner'
import '@provetcloud/web-components/lib/Stack'
import '@provetcloud/web-components/lib/Button'
import '@provetcloud/web-components/lib/Input'
import '@provetcloud/web-components/lib/Icon'
import '@provetcloud/web-components/lib/Avatar'

useHead({
  title: 'Account Created Successfully',
  meta: [
    {
      name: 'description',
      content: 'Your account has been successfully created. Welcome to Provet Cloud!',
    },
  ],
})
</script>

<template>
  <BaseContainer>
    <provet-card class="w-full max-w-[700px] mx-auto mt-xxl">
      <h1 slot="header" class="font-heading">
        Account Created Successfully!
      </h1>
      <provet-banner variant="success" class="mb-l">
        <p>Your account has been created and you're ready to get started.</p>
      </provet-banner>

      <div class="flex flex-col gap-m mt-m">
        <NuxtLink to="/">
          <provet-button
            variant="primary"
            size="l"
            expand
          >
            Continue to Dashboard
            <provet-icon slot="end" name="arrow-right" />
          </provet-button>
        </NuxtLink>
      </div>
    </provet-card>
  </BaseContainer>
</template>
