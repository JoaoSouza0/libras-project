import _ from '@/consts/privateRoutes.js';
import { HOME } from '@/consts/publicRoutes.js';
import teacherRoutes from './teacherRoutes';
import ViewList from '@/views/ViewList.vue';
import ViewComplementData from '@/views/ViewComplementData.vue';
import ViewsTeacherDetails from '@/views/ViewsTeacherDetails.vue';
import ViewScheduleClass from '@/views/ViewScheduleClass.vue';

const privateRoutes = [
  ...teacherRoutes,
  {
    path: _.TEACHER_LIST.PATH,
    name: _.TEACHER_LIST.NAME,
    component: ViewList,
    beforeEnter: ({ query }) => {
      if (!query?.type) return { name: HOME.NAME };

      const { address = null, end = null, start = null } = query;

      if (address || (end && start)) return true;
    }
  },
  {
    path: _.USER_COMPLEMENT_DATA.PATH,
    name: _.USER_COMPLEMENT_DATA.NAME,
    component: ViewComplementData
  },
  {
    path: _.TEACHER_DETAILS.PATH,
    name: _.TEACHER_DETAILS.NAME,
    component: ViewsTeacherDetails
  },
  {
    path: _.SCHEDULE_CLASS.PATH,
    name: _.SCHEDULE_CLASS.NAME,
    component: ViewScheduleClass
  }
];

export default privateRoutes.map((route) => {
  if (route.meta) {
    route.meta.requireAuth = true;
  } else {
    route.meta = {
      requireAuth: true
    };
  }

  return route;
});
