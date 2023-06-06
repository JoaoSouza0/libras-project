<template>
  <section id="view-create-class">
    <div class="next-classes">
      <h2>Próximas aulas</h2>
      <div class="content">
        <i class="date">16 de julho, 13h30m </i>
        <p class="student-name">Joaquim da Silva Pereira</p>
        <a class="place">Presencial - Liberdade</a>
      </div>
    </div>
    <div class="calendar">
      <h2>Agenda</h2>
      <ScheduleCalendar :attributesProp="attributesProp" @open="handleModal" />
    </div>
    <edit-modal
      v-if="open"
      :time-list="formattedClasses"
      :selected-day="selectedDay"
      @close="open = false"
      @save="handleSaveHours"
      @remove="handleRemove"
    />
  </section>
</template>

<script setup>
import ScheduleCalendar from '@/components/ScheduleCalendar.vue';
import EditModal from '@/layouts/Modais/EditModal.vue';
import { ref, reactive, onBeforeMount, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSchedule } from '../composables/schedule.js';

const route = useRoute();
const schedule = useSchedule('openAppointments', route.params.id);

const open = ref(false);
const selectedDay = ref(null);

const attributesProp = reactive([
  {
    dates: schedule.appointmentsDay,
    content: '',
    highlight: {
      class: 'highlight'
    }
  }
]);

const classes = ref([]);
const formattedClasses = computed(() => {
  return classes.value.map((item) => item.date).sort((a, b) => a - b);
});

const handleModal = async (date) => {
  const data = await schedule.getHourClasses(date);
  classes.value = data;
  open.value = true;
  return (selectedDay.value = date);
};

const handleSaveHours = (date) => {
  schedule.saveAppointments(date);
  attributesProp[0].dates.push(selectedDay.value);
  return (open.value = false);
};

const handleRemove = (key) => {
  schedule.deleteAppointments(classes.value[key].id);
  console.log(classes.value.length);
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
    margin-bottom: 5rem;
    .content {
      padding-left: 1rem;
      border-left: 0.5rem solid var(--text-primary);
      min-height: 6.5rem;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;

      p,
      a {
        margin-top: 0.7rem;
      }

      a {
        color: black;
      }
    }
    .date {
      font-size: 1.2rem;
    }
    .student-name {
      font-size: 1.6rem;
    }
    .place {
      font-size: 1.4rem;
    }
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
}
</style>
