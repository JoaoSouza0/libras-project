<template>
  <div class="card has-background-success-dark mb-5 p-4">
    <div class="field">
      <div class="control">
        <textarea
          :value="content"
          @input="$emit('update:content', $event.target.value)"
          ref="editRef"
          class="textarea"
          placeholder="Add a new note"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button @click="emit('buttonClicked')" class="button is-link has-background-success">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const editRef = ref(null)

const focus = () => {
  return editRef.value.focus()
}

defineExpose({
  focus
})

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:content', 'buttonClicked'])
</script>
