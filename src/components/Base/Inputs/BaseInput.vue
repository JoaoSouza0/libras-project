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

    <div class="error">
      <slot name="error-message">
        <p>{{ message }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const refInput = ref(null);
const hasFocused = ref(false);
const message = ref('');

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
  },
  required: {
    type: Boolean,
    default: false
  }
});

const handleInput = ({ target, srcElement }) => {
  emit('update:modelValue', target.value);

  if (!srcElement.validity.valid) {
    message.value = srcElement.validationMessage;
    return emit('validation', getError(srcElement.validity));
  }

  message.value = '';
  return emit('validation', null);
};

const getError = (validity) => {
  for (let key in validity) {
    if (validity[key]) return key;
  }
};

const hasFocus = () => {
  // It will be replaced in the future for "user-invalid" pseudo class in the future
  hasFocused.value = true;
};

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
    background: #cae9ff;
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
      outline: 0.2rem solid #5fa8d3d0;
      border-radius: 0.8rem;
    }

    input:invalid.input {
      background: #fdeeec;
      border-radius: 0.8rem;
    }

    input:invalid:focus-visible.input {
      outline: 2px solid red;
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
    color: red;
  }
}
</style>
