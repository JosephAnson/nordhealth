<script setup lang="ts">
import { configure } from 'vee-validate'
import { z } from 'zod'
import { userSchema } from '~~/schemas/user'

configure({
  validateOnModelUpdate: false,
})

definePageMeta({
  middleware: [
    'guest',
  ],
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

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(
    userSchema.extend({
      confirmPassword: z.string({ required_error: 'Confirm password is required' }).min(1, { message: 'Confirm password is required' }),
    })
      .refine(data => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      }),
  ),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const [receiveUpdates, receiveUpdatesAttrs] = defineField('receiveUpdates')

const { signup, loading } = useAuth()

const onSubmit = handleSubmit((values) => {
  signup(values.email, values.password, values.receiveUpdates)
})
</script>

<template>
  <BaseContainer>
    <provet-card class="w-full max-w-[360px] mx-auto">
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

          <provet-button type="submit" variant="primary" size="l" expand :loading="loading">
            Sign up
          </provet-button>
        </provet-stack>
      </form>
    </provet-card>
  </BaseContainer>
</template>
