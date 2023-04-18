<template>
  <div>
    <notes-edit ref="noteRef" v-model:content="newNote" @button-clicked="editNote" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import { useRoute, useRouter } from 'vue-router'

import NotesEdit from '@/components/Notes/NotesEdit.vue'

const storeNotes = useNotesStore()
const route = useRoute()
const router = useRouter()

const newNote = ref(storeNotes.noteContent(route.params.id))
const noteRef = ref(null)

const editNote = () => {
  storeNotes.editNote({
    id: Number(route.params.id),
    content: newNote.value
  })

  newNote.value = ''
  return router.push({ name: 'notes' })
}
</script>
<style></style>
