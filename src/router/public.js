import _ from '@/consts/publicRoutes.js';

import ViewRegister from '@/views/Login/ViewRegister.vue';
import ViewLogin from '@/views/Login/ViewLogin.vue';
import ViewHome from '@/views/ViewHome.vue';

const publicRoutes = [
  {
    path: _.HOME.PATH,
    name: _.HOME.NAME,
    component: ViewHome
  },
  {
    path: _.REGISTER.PATH,
    name: _.REGISTER.NAME,
    component: ViewRegister
  },
  {
    path: _.LOGIN.PATH,
    name: _.LOGIN.NAME,
    component: ViewLogin
  }
];

export default publicRoutes.map((route) => {
  route.meta = {
    requireAuth: false
  };
  return route;
});
