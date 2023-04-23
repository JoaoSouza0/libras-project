<template>
  <base-input v-bind="$props" :type="type" required @update:modelValue="$emit('update:modelValue', $event)">
    <template #icon>
      <img
        src="@/assets/open-eye.svg"
        alt="mostrar senha"
        @click="changePasswordStatus(hidePassword)"
      />
    </template>

    <template #error-message>
      <slot name="error-message"></slot>
    </template>
  </base-input>
</template>

<script setup>
import { ref, computed, unref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  valid: {
    type: Boolean
  },
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  autocomplete: {
    type: String,
    default: 'on'
  }
})

const hidePassword = ref(true)

const type = computed(() => (hidePassword.value ? 'password' : 'text'))

const changePasswordStatus = (hide) => {
  return (hidePassword.value = !hide)
}
</script>

<style lang="less" scoped>
</style>
