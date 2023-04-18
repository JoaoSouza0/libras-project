import ViewsNotes from '@/views/ViewsNotes.vue'
import ViewsEditNote from '@/views/ViewsEditNote.vue'
import ViewsStats from '@/views/ViewsStats.vue'

const publicRoutes = [
  {
    path: '/',
    name: 'notes',
    component: ViewsNotes
  },
  {
    path: '/edit/:id',
    name: 'edit-note',
    component: ViewsEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewsStats
  }
]

export default publicRoutes.map((route) => {
  route.meta = {
    requireAuth: false
  }
  return route
})
