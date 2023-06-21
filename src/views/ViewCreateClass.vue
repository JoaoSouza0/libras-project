<template>
  <section id="view-create-class">
    <schedule-mobile
      :attributes="attributesProp"
      :time-list="formattedClasses"
      @open="open = true"
      @change="handleChangeDay"
      @remove="handleRemove"
    />
    <edit-modal
      v-if="open"
      :selected-day="selectedDay"
      @close="open = false"
      @save="handleSaveHours"
    />
  </section>
</template>

<script setup>
import ScheduleMobile from '@/layouts/ScheduleMobile.vue';
import EditModal from '@/layouts/Modais/EditModal.vue';
import { ref, reactive, computed} from 'vue';
import { useRoute } from 'vue-router';
import { useSchedule } from '../composables/schedule.js';
import moment from 'moment/min/moment-with-locales';
moment.locale('pt');

const route = useRoute();
const openSchedule = useSchedule('openAppointments', route.params.id);
const closeSchedule = useSchedule('closeAppointments', route.params.id);

const open = ref(false);
const k = ref(0);
const selectedDay = ref(null);
let classes = reactive([]);

const attributesProp = reactive([
  {
    dates: closeSchedule.appointmentsDay,
    highlight: {
      content: 'white',
      color: 'red',
      fillMode: 'light',
      class: 'closed-day'
    }
  },
  {
    dates: openSchedule.appointmentsDay,
    highlight: {
      class: 'highlight',
      content: 'white',
      fillMode: 'light',
      contentClass: 'italic'
    }
  }
]);

const formattedClasses = computed(() => {
  return classes?.map((item) => item).sort((a, b) => a.date - b.date);
});

const handleChangeDay = async (date) => {
  classes.length = 0;
  const openData = await openSchedule.getHourClasses(date);
  const closeData = await closeSchedule.getHourClasses(date);
  classes.push(...openData, ...closeData);
  return (selectedDay.value = date);
};

const handleSaveHours = (date) => {
  openSchedule.saveAppointments(date);
  classes.push(...date);
  return (open.value = false);
};

const handleRemove = (key) => {
  openSchedule.deleteAppointments(formattedClasses.value[key].id);
  classes.splice(classes.indexOf(formattedClasses.value[key]), 1);
  return;
};
</script>

<style lang="less" scoped>
#view-create-class {
  width: 100%;
  margin-top: 3rem;

  .date-container {
    display: flex;
    justify-content: flex-start;
  }

  .vc-container {
    transform: scale(0.25);
    position: absolute;
    top: -8%;
    right: 14%;

    .vc-focus {
      border: none;
    }
  }

  h2 {
    color: var(--text-primary);
    font-size: 2.8rem;
    margin-bottom: 2rem;
  }

  .next-classes {
    margin-bottom: 2rem;
  }

  .calendar {
    margin-bottom: 5rem;
  }

  .button {
    transform: scale(0.233);
    position: relative;
    top: -26.6px;
    left: 22%;
  }

  .bullets {
    padding-top: 1rem;
  }
}
</style>
