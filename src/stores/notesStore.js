import { defineStore, acceptHMRUpdate } from 'pinia'

export const useNotesStore = defineStore('storeNotes', {
  state: () => ({
    notes: [
      {
        id: 1,
        content: `  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quam voluptatum odio delectus
            debitis, reprehenderit accusantium aspernatur ipsam, corrupti libero unde minima
            perspiciatis, dolor inventore numquam explicabo sunt non. Cum.`
      },
      {
        id: 2,
        content: `  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quam voluptatum odio delectus
            debitis, reprehenderit accusantium aspernatur ipsam, corrupti libero unde minima
            perspiciatis, dolor inventore numquam explicabo sunt non. Cum.`
      },
      {
        id: 3,
        content: `  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quam voluptatum odio delectus
            debitis, reprehenderit accusantium aspernatur ipsam, corrupti libero unde minima
            perspiciatis, dolor inventore numquam explicabo sunt non. Cum.`
      }
    ]
  }),
  getters: {
    noteContent: (state) => {
      return (id) => state.notes.find((item) => Number(id) === item.id).content
    }
  },
  actions: {
    addNotes(content) {
      const note = {
        id: new Date().getTime(),
        content: content
      }

      return this.notes.unshift(note)
    },
    deleteNote(id) {
      return (this.notes = this.notes.filter((note) => note.id != id))
    },
    editNote({ id, content }) {
      const index = this.notes.findIndex((item) => item.id === id)
      return (this.notes[index].content = content)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
