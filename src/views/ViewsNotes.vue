<template>
  <div class="notes">
    <notes-edit ref="noteRef" v-model:content="newNote" @button-clicked="addNote" />
    <notes-child
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
      @eventDelete="storeNotes.deleteNote(note.id)"
      @eventEdit="handleEdit(note.id)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import { useRouter } from 'vue-router'
import NotesChild from '@/components/Notes/NotesChild.vue'
import NotesEdit from '@/components/Notes/NotesEdit.vue'

const storeNotes = useNotesStore()
const router = useRouter()

const newNote = ref('')
const noteRef = ref(null)

const addNote = () => {
  storeNotes.addNotes(newNote.value)
  newNote.value = ''
  return noteRef.value.focus()
}

const handleEdit = (id) => {
  return router.push({ name: 'edit-note', params: { id: id } })
}
</script>
<style></style>
