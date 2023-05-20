import { createRouter, createWebHashHistory } from 'vue-router';
import { useIsAuthenticate } from '@/composables/user.js';
import publicRoutes from './public';
import privateRoutes from './private';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
});

router.beforeEach(async (to, from) => {
  const { meta } = to;
  const { user } = await useIsAuthenticate();
  
  if (!meta.requireAuth) return true;

  if (!user) return false; //retornar para a pagina de not found

  return true;
});

export default router;
