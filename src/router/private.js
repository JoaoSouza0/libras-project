import _ from '@/consts/privateRoutes.js';
import { HOME } from '@/consts/publicRoutes.js';
import ViewList from '@/views/ViewList.vue';
import ViewComplementData from '@/views/ViewComplementData.vue';

const privateRoutes = [
  {
    path: _.TEACHER_LIST.PATH,
    name: _.TEACHER_LIST.NAME,
    component: ViewList,
    beforeEnter: (to ) => {
      if (to.query?.address) {
        return true;
      }
      return { name: HOME.NAME };
    }
  },
  {
    path: _.USER_COMPLEMENT_DATA.PATH,
    name: _.USER_COMPLEMENT_DATA.NAME,
    component: ViewComplementData
  }
];

export default privateRoutes.map((route) => {
  route.meta = {
    requireAuth: true
  };
  return route;
});
