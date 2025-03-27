<script setup lang="ts">
import { userSchema } from '~~/schemas/user'

import '@provetcloud/web-components/lib/Input'
import '@provetcloud/web-components/lib/Button'
import '@provetcloud/web-components/lib/Stack'
import '@provetcloud/web-components/lib/Card'
import '@provetcloud/web-components/lib/Checkbox'
import '@provetcloud/web-components/lib/Banner'
import '@provetcloud/web-components/lib/Divider'

const router = useRouter()
const showPassword = ref(false)

const { values, handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(userSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [receiveUpdates, receiveUpdatesAttrs] = defineField('receiveUpdates')

const { execute: registerUser, status } = useFetch('/api/auth/register', {
  method: 'POST',
  body: values,
  immediate: false,
  watch: false,
  async onResponse() {
    await router.push('/success')
  },
})

const onSubmit = handleSubmit(() => registerUser())

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div>
    <provet-card class="w-full max-w-[700px] mx-auto mt-xxl">
      <form class="flex flex-col space-y-l" @submit="onSubmit">
        <h1 class="text-xxl font-semibold mb-m">
          Create your account
        </h1>

        <provet-input
          id="email"
          v-model="email"
          label="Email"
          type="email"
          expand
          required
          :error="errors.email"
          autocomplete="email"
          @blur="emailAttrs.onBlur"
        />

        <provet-input
          id="password"
          v-model="password"
          expand
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          required
          :error="errors.password"
          autocomplete="new-password"
          @blur="passwordAttrs.onBlur"
        >
          <provet-button
            slot="end"
            type="button"
            @click="togglePasswordVisibility"
          >
            <provet-icon size="m" :name="showPassword ? 'interface-edit-off' : 'interface-edit-on'" />
          </provet-button>
        </provet-input>

        <provet-checkbox
          id="receiveUpdates"
          v-model="receiveUpdates"
          type="checkbox"
          label="I'd like to receive occasional product updates and announcements"
          :error="errors.receiveUpdates"
          @blur="receiveUpdatesAttrs.onBlur"
        />

        <provet-divider class="divider mb-l" />

        <provet-button type="submit" variant="primary" size="l" expand :loading="status === 'pending'">
          Sign up
        </provet-button>
      </form>
    </provet-card>
  </div>
</template>
