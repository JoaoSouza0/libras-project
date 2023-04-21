import ViewRegister from '@/views/Login/ViewRegister.vue'
import ViewLogin from '@/views/Login/ViewLogin.vue'
import ViewHome from '@/views/ViewHome.vue'

const publicRoutes = [
  {
    path: '/',
    name: 'home',
    component: ViewHome
  },
  {
    path: '/register',
    name: 'register',
    component: ViewRegister
  },
  {
    path: '/login',
    name: 'login',
    component: ViewLogin
  }
]

export default publicRoutes.map((route) => {
  route.meta = {
    requireAuth: false
  }
  return route
})
