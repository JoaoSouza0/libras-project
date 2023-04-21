<template>
  <div id="select-input">
    <fieldset>
      <div v-for="(option, index) in optionsFormatted" :key="index">
        <input
          type="radio"
          v-model="value"
          :id="option.label"
          :name="option.label"
          :value="option.value"
          @change="$emit('update:modelValue', value)"
        />
        <label :for="option.label">{{ option.label }}</label>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const value = ref(props.modelValue)

const props = defineProps({
  options: {
    type: Array
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true
  }
})

const optionsFormatted = computed(() => {
  return props.options.map((option) => {
    return option.value
      ? option
      : {
          label: option.label,
          value: option.label
        }
  })
})
</script>

<style lang="less" scoped>
#select-input {
  fieldset {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      margin-right: 33px;

      input {
        margin-right: 8px;
        appearance: none;

        border-radius: 50%;

        width: 24px;
        height: 24px;
        background: var(--input-primary);
        outline: 2px solid var(--link-primary);

        margin-right: 8px;
        cursor: pointer;
      }

      input:checked {
        outline: 3px solid var(--input-primary);
      }

      input:checked::before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        margin: 7px auto;
        border-radius: 50%;
        background: var(--link-primary);
      }
    }
  }
}
</style>
