<script setup lang="ts">
import type { Input } from '@provetcloud/web-components'
import type { WCProps } from '@provetcloud/web-components-vue-types'

import '@provetcloud/web-components/lib/Input'
import '@provetcloud/web-components/lib/Button'
import '@provetcloud/web-components/lib/Icon'
import '@provetcloud/web-components/lib/Tooltip'

interface Props {
  modelValue?: string
  inputProps: WCProps<Input>
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const model = defineModel<string>()

const showPassword = ref(false)
const inputId = useId()

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <provet-input
    v-bind="props.inputProps"
    v-model="model"
    :type="showPassword ? 'text' : 'password'"
    @blur="emit('blur')"
  >
    <provet-button
      slot="end"
      type="button"
      :aria-describedby="`${inputId}-tooltip`"
      @click="togglePasswordVisibility"
    >
      <provet-icon size="m" :name="showPassword ? 'interface-edit-off' : 'interface-edit-on'" />
    </provet-button>
  </provet-input>
  <provet-tooltip :id="`${inputId}-tooltip`">
    Show / hide {{ props.inputProps.label?.toLowerCase() }}
  </provet-tooltip>
</template>
