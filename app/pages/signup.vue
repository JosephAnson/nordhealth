<script setup lang="ts">
import { configure } from 'vee-validate'
import { updateUserSchema } from '~~/schemas/user'

configure({
  validateOnModelUpdate: false,
})

useHead({
  title: 'Sign Up - Create Your Account',
  meta: [
    {
      name: 'description',
      content: 'Create your account to get started with Provet Cloud. Sign up now for access to our services.',
    },
  ],
})

const router = useRouter()

const { values, handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(updateUserSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const [receiveUpdates, receiveUpdatesAttrs] = defineField('receiveUpdates')

const { execute: registerUser, status } = useFetch('/api/auth/register', {
  method: 'POST',
  body: values,
  immediate: false,
  watch: false,
  async onResponse() {
    await router.push('/success')
  },
  onRequestError() {
    router.push('/error')
  },
})

const onSubmit = handleSubmit(() => registerUser())
</script>

<template>
  <BaseContainer>
    <div class="flex flex-col items-center justify-center flex-1">
      <provet-card class="w-full max-w-[360px] mx-auto mt-l m:mt-xxl">
        <h1 slot="header" class="text-l font-semibold">
          Create your account
        </h1>

        <form @submit="onSubmit">
          <provet-stack>
            <provet-input
              id="email"
              v-model="email"
              label="Email"
              type="email"
              expand
              required
              placeholder="you@example.com"
              :error="errors.email"
              autocomplete="email"
              @blur="emailAttrs.onBlur"
            />

            <BasePasswordInput
              id="password"
              v-model="password"
              :input-props="{
                label: 'Password',
                expand: true,
                required: true,
                error: errors.password,
                autocomplete: 'new-password',
              }"
              @blur="passwordAttrs.onBlur"
            />

            <BasePasswordInput
              id="confirmPassword"
              v-model="confirmPassword"
              :input-props="{
                label: 'Confirm password',
                expand: true,
                required: true,
                error: errors.confirmPassword,
                autocomplete: 'new-password',
              }"
              @blur="confirmPasswordAttrs.onBlur"
            />

            <provet-checkbox
              id="receiveUpdates"
              v-model="receiveUpdates"
              type="checkbox"
              hint="Optional"
              label="I'd like to receive occasional product updates and announcements"
              :error="errors.receiveUpdates"
              @blur="receiveUpdatesAttrs.onBlur"
            />

            <provet-divider class="divider mb-l" />

            <provet-button type="submit" variant="primary" size="l" expand :loading="status === 'pending'">
              Sign up
            </provet-button>
          </provet-stack>
        </form>
      </provet-card>
    </div>
  </BaseContainer>
</template>
