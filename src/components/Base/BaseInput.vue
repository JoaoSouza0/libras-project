<template>
  <div class="base-input">
    <label :for="id">{{ label }}</label>

    <div class="input-content">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input.stop="$emit('update:modelValue', $event.target.value)"
        :autocomplete="autocomplete"
      />
      <span class="icon">
        <slot name="icon" />
      </span>
    </div>

    <slot name="error-message" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  valid: {
    type: Boolean
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
  },
  autocomplete: {
    type: String,
    default: 'on'
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="less">
.base-input {
  display: inline-block;
  position: relative;
  width: 100%;

  label {
    display: block;
    font-size: 2rem;
    padding: 8px 0;
  }

  .input-content {
    display: flex;
    align-items: center;
    background: #cae9ff;
    border-radius: 8px;

    input {
      width: 100%;
      padding: 22px;
      padding-right: 50px;
      font-size: 2rem;
      background: transparent;
      border: none;
    }

    input::placeholder {
      font-size: 2rem;
    }

    input:focus-visible {
      outline: 2px solid #5fa8d3d0;
      border-radius: 8px;
    }

    .icon {
      position: absolute;
      right: 3%;
    }
  }
}
</style>
