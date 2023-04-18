<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light">
          <small>{{ character }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click.prevent="handleEdit">Edit</a>
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteCliked">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    default: () => ({
      content: ''
    })
  }
})

const emit = defineEmits(['eventDelete', 'eventEdit'])

const character = computed(() => {
  const { length } = props.note.content
  const description = length > 1 ? 'characters' : 'character'

  return `${length} ${description}`
})

const handleDeleteCliked = (id) => {
  return emit('eventDelete', id)
}

const handleEdit = (id) => {
  return emit('eventEdit', id)
}
</script>
