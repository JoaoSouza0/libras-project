import _ from '@/consts/privateRoutes.js';
import ViewList from '@/views/ViewList.vue';

const privateRoutes = [
  {
    path: _.TEACHER_LIST.PATH,
    name: _.TEACHER_LIST.NAME,
    component: ViewList
  }
];

export default privateRoutes.map((route) => {
  route.meta = {
    requireAuth: true
  };
  return route;
});
