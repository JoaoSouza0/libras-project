import _ from '@/consts/privateRoutes.js';
import ViewList from '@/views/ViewList.vue';
import TeacherComplementData from '@/views/ViewTeacherComplementData.vue';
import StudentComplementData from '@/views/ViewStudentComplementData.vue';

const privateRoutes = [
  {
    path: _.TEACHER_LIST.PATH,
    name: _.TEACHER_LIST.NAME,
    component: ViewList
  },
  {
    path: _.TEACHER_COMPLEMENT_DATA.PATH,
    name: _.TEACHER_COMPLEMENT_DATA.NAME,
    component: TeacherComplementData
  },
  {
    path: _.STUDENT_COMPLEMENT_DATA.PATH,
    name: _.STUDENT_COMPLEMENT_DATA.NAME,
    component: StudentComplementData
  }
];

export default privateRoutes.map((route) => {
  route.meta = {
    requireAuth: true
  };
  return route;
});
