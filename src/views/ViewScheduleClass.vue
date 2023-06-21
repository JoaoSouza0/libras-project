<template>
  <div id="view-schedule-class">
    <schedule-mobile :attributes="attributesProp" :time-list="classes" @change="handleChangeDay">
      <template #head>
        <span></span>
      </template>
      <template #bottom="{ key, item }">
        <base-button v-if="!item.name" id="button" @click="handleSave(key)">Confirmar</base-button>
      </template>
    </schedule-mobile>
    <!-- Perguntar para a mãe sobre qual é a melhor maneira de impedir a pessoa de ficar marcando varios dias -->
  </div>
</template>

<script setup>
import ScheduleMobile from '@/layouts/ScheduleMobile.vue';
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useSchedule } from '../composables/schedule.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();
const teacherOpenSchedule = useSchedule('openAppointments', route.params.id);
const teacherCloseSchedule = useSchedule('closeAppointments', route.params.id);
const studentCloseSchedule = useSchedule('closeAppointments', 'PGHkG6ZOLLPQL3RCJzhDHMNZUVx1');

const classes = reactive([]);

const attributesProp = reactive([
  {
    dates: teacherOpenSchedule.appointmentsDay,
    content: '',
    highlight: {
      class: 'highlight',
      content: 'white',
      fillMode: 'light',
      contentClass: 'italic'
    }
  },
  {
    dates: studentCloseSchedule.appointmentsDay,
    highlight: {
      content: 'white',
      color: 'red',
      fillMode: 'light',
      class: 'closed-day'
    }
  }
]);

const handleSave = async (index) => {
  const classDate = classes[index].date.getDate();
  const result = studentCloseSchedule.appointmentsDay.value.find(
    (item) => item.getDate() === classDate
  );

  if (result) return console.log('Voce já tem um horário reservado nesse dia');

  const payload = {
    name: 'Horário reservado',
    date: classes[index].date
  };

  try {
    await Promise.all([handleTeacherAppointment(index), handleStudentAppointment(index)]);
    classes.splice(index, 1);
    return classes.push(payload);
  } catch (e) {
    console.log(e);
  }
};

const handleTeacherAppointment = async (index) => {
  const payload = {
    name: userStore.user.name,
    date: classes[index].date
  };

  return await teacherCloseSchedule
    .saveAppointments([payload])
    .then(teacherOpenSchedule.deleteAppointments(classes[index].id));
};
const handleStudentAppointment = async (index) => {
  const payload = {
    name: 'Horario já reservado',
    date: classes[index].date
  };

  return await studentCloseSchedule
    .saveAppointments([payload])
    .then(teacherOpenSchedule.deleteAppointments(classes[index].id));
};

const handleChangeDay = async (date) => {
  classes.length = 0;
  const teacherDate = await teacherOpenSchedule.getHourClasses(date);
  const studentData = await studentCloseSchedule.getHourClasses(date);

  let list = studentData.length ? studentData : teacherDate;

  return classes.push(...list);
};
</script>

<style lang="less" scoped>
#view-schedule-class {
  width: 100%;
  padding-top: 3rem;

  #button {
    position: relative;
    left: 55%;
    width: 10rem;
    font-size: 1.6rem;
    padding: 1.5rem;
  }
  .head {
    h2 {
      color: var(--text-primary);
      font-size: 2.8rem;
      margin-bottom: 2rem;
    }

    p {
      font-size: 2rem;
    }

    margin-bottom: 2.4rem;
  }
}
</style>
