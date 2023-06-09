<template>
  <section id="view-create-class">
    <div class="next-classes">
      <h2>Próximas aulas</h2>
      <base-slide-swiper :list="nextClasses">
        <template #list-item="{ item }">
          <div class="content">
            <i class="date">{{ formattedDate(item.date) }} </i>
            <p class="student-name">{{ item.name }}</p>
            <a class="place">{{ userStore.user.neighborhood }}</a>
          </div>
        </template>
      </base-slide-swiper>
    </div>
    <div class="calendar">
      <h2>Agenda</h2>
      <ScheduleCalendar :attributesProp="attributesProp" @open="handleModal" :key="k" />
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
import { ref, reactive, computed, onBeforeMount, shallowRef, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { useSchedule } from '../composables/schedule.js';
import { useUserStore } from '@/stores/UserStore';
import moment from 'moment/min/moment-with-locales';
moment.locale('pt');

const route = useRoute();
const userStore = useUserStore();
const openSchedule = useSchedule('openAppointments', route.params.id);
const closeSchedule = useSchedule('closeAppointments', route.params.id);

const open = ref(false);
const k = ref(0);
const selectedDay = ref(null);
const nextClasses = ref();
const classes = shallowRef([]);

const attributesProp = reactive([
  {
    dates: openSchedule.appointmentsDay,
    content: '',
    highlight: {
      class: 'highlight'
    }
  },
  {
    dates: closeSchedule.appointmentsDay,
    content: '',
    highlight: {
      class: 'closed-day'
    }
  }
]);

const formattedClasses = computed(() => {
  return classes.value.map((item) => item).sort((a, b) => a.date - b.date);
});

const formattedDate = (date) => {
  return moment(date).format('DD [de] MMMM, HH[h]mm[m]');
};

const handleModal = async (date) => {
  const openData = (await openSchedule.getHourClasses(date));
  const closeData = (await closeSchedule.getHourClasses(date));

  classes.value = [...toRaw(openData), ...toRaw(closeData)];
  open.value = true;
  return (selectedDay.value = date);
};

const handleSaveHours = (date) => {
  openSchedule.saveAppointments(date);
  attributesProp[0].dates.push(selectedDay.value);
  k.value++;
  return (open.value = false);
};

const handleRemove = (key) => {
  openSchedule.deleteAppointments(classes.value[key].id);
  console.log(classes.value.length);
  return;
};

onBeforeMount(async () => {
  nextClasses.value = await closeSchedule.getNextClasses(new Date());
});
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
    .content {
      width: 22rem;
      padding: 0 1rem;
      margin-right: 1rem;
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

  .bullets {
    padding-top: 1rem;
  }
}
</style>
