<template>
  <div class="base-input">
    <label :for="id">{{ label }}</label>

    <div class="input-content">
      <renderedInput
        ref="refInput"
        @input.stop="handleInput"
        @invalid.prevent
        @focus="hasFocus"
        @blur="$emit('onBlur', modelValue)"
      />

      <span class="icon" v-if="type != 'date'">
        <slot name="icon" />
      </span>
    </div>
    <div class="error">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue';

const refInput = ref(null);
const hasFocused = ref(false);
const autocompleteBackground = ref(true);
const message = ref('');

const props = defineProps({
  modelValue: {
    type: [null, String],
    required: true
  },
  id: {
    type: String
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
  },
  required: {
    type: Boolean,
    default: false
  },
  pattern: {
    type: String
  }
});

const renderedInput = () =>
  h(inputType(), {
    class: { input: hasFocused.value },
    ...props,
    value: props.modelValue,
    rows: 6
  });

const inputType = () => {
  return props.type === 'textarea' ? 'textarea' : 'input';
};

const handleInput = ({ target }) => {
  emit('update:modelValue', target.value);
  if (!target.validity.valid) {
    refInput.value.setCustomValidity('');
    message.value = target.validationMessage;
    return emit('validation', getError(target.validity));
  }
  message.value = '';
  return emit('validation', null);
};

const getError = (validity) => {
  for (let key in validity) {
    if (validity[key]) return key;
  }
};

const setCustomValidity = (customMessage) => {
  autocompleteBackground.value = !customMessage;
  message.value = customMessage;
  return refInput.value.setCustomValidity(customMessage);
};

const hasFocus = (event) => {
  handleInput(event);
  // It will be replaced in the future for "user-invalid" pseudo class in the future
  hasFocused.value = true;
};

const focus = (event) => {
  return refInput.value.focus();
};

const backgroundValid = computed(() => {
  return autocompleteBackground.value ? 'var(--input-secondary)' : 'var(--error-background)';
});

defineExpose({ setCustomValidity, focus });
const emit = defineEmits(['update:modelValue', 'validation', 'onBlur']);
</script>

<style lang="less">
.base-input {
  display: inline-block;
  position: relative;
  width: 100%;

  .input-content {
    display: flex;
    align-items: center;
    background: var(--input-secondary);
    border-radius: 0.8rem;

    input,
    textarea {
      width: 100%;
      padding: 2.2rem;
      border-radius: 0.8rem;
      padding-right: 5rem;
      background: transparent;
      border: none;
    }

    input:focus-visible,
    textarea:focus-visible {
      outline: 0.2rem solid var(--link-primary);
      border-radius: 0.8rem;
    }

    input:invalid.input,
    textarea:invalid.input {
      background: var(--error-background);
      border-radius: 0.8rem;
    }

    input:invalid:focus-visible.input,
    textarea:invalid:focus-visible.input {
      outline: 2px solid var(--red);
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 40px v-bind(backgroundValid) inset !important;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    input[type='date']::-webkit-calendar-picker-indicator {
      position: absolute;
      cursor: pointer;
      padding: 2rem;
      right: 0;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      height: 6.6rem;
      width: 6rem;
      cursor: pointer;

      img {
        width: auto;
      }
    }
  }
  .error {
    position: absolute;
    margin-top: 5px;
    padding-left: 2px;
    color: var(--red);
  }
}
</style>
