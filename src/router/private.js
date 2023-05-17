import ViewList from '@/views/ViewList.vue';


const privateRoutes = [
  {
    path: '/list',
    name: 'teacherList',
    component: ViewList
  },
];

export default privateRoutes.map((route) => {
  route.meta = {
    requireAuth: true
  };
  return route;
});
