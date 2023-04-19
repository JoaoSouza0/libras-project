import ViewsNotes from '@/views/ViewsNotes.vue'
import ViewsEditNote from '@/views/ViewsEditNote.vue'
import ViewsStats from '@/views/ViewsStats.vue'
import ViewRegister from '@/views/Login/ViewRegister.vue'

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
  },
  {
    path: '/register',
    name: 'register',
    component: ViewRegister
  },
]

export default publicRoutes.map((route) => {
  route.meta = {
    requireAuth: false
  }
  return route
})
