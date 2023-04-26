<template>
  <div class="base-input">
    <label :for="id">{{ label }}</label>

    <div class="input-content">
      <input
        ref="refInput"
        :class="{ input: hasFocused }"
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        @input.stop="handleInput"
        @invalid.prevent
        @focus="hasFocus"
      />
      <span class="icon">
        <slot name="icon" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const refInput = ref(null);
const hasFocused = ref(false);
const autocompleteBackground = ref(true);
const message = ref('');

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  id: {
    type: String,
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
  }
});

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

const hasFocus = () => {
  // It will be replaced in the future for "user-invalid" pseudo class in the future
  hasFocused.value = true;
};

const backgroundValid = computed(() => {
  return autocompleteBackground.value ? 'var(--input-secondary)' : 'var(--error-background)';
});

defineExpose({ setCustomValidity });
const emit = defineEmits(['update:modelValue', 'validation']);
</script>

<style lang="less">
.base-input {
  display: inline-block;
  position: relative;
  width: 100%;

  label {
    display: block;
    padding: 0.8rem 0;
  }

  .input-content {
    display: flex;
    align-items: center;
    background: var(--input-secondary);
    border-radius: 0.8rem;

    input {
      width: 100%;
      padding: 2.2rem;
      border-radius: 0.8rem;
      padding-right: 5rem;
      background: transparent;
      border: none;
    }

    input::placeholder {
      font-size: 2rem;
    }

    input:focus-visible {
      outline: 0.2rem solid var(--link-primary);
      border-radius: 0.8rem;
    }

    input:invalid.input {
      background: var(--error-background);
      border-radius: 0.8rem;
    }

    input:invalid:focus-visible.input {
      outline: 2px solid var(--red)
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 40px v-bind(backgroundValid) inset !important;
      
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      height: 6.6rem;
      width: 6rem;

      img {
        cursor: pointer;
        width: auto;
      }
    }
  }
  .error {
    position: absolute;
    margin-top: 5px;
    padding-left: 2px;
    color: var(--red)
  }
}
</style>
