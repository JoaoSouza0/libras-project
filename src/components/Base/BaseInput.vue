<template>
  <div id="#base-input">
    <label for="input">{{ label }}</label>
    <input
      id="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
  type: {
    type: String,
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="less" scoped>
#base-input {
  width: 100%;

  input {
    width: 515px;
    padding: 25px;
    border: 2px solid rgba(95, 168, 211, 0.6);
    border-radius: 8px;
    background: #cae9ff;
  }
}
</style>
