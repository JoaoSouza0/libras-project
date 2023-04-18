import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './public'

export default createRouter({
  history: createWebHashHistory(),
  routes: routes
})
