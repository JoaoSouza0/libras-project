<template>
  <section>
    <div id="view-schedule-class">
      <div class="head">
        <h2>Agenda do Professor</h2>
        <p>Clique em um dos dias disponíveis para escolher um horário</p>
      </div>
      <ScheduleCalendar :attributesProp="attributesProp" @open="handleModal" />
    </div>
    <side-modal v-if="open" :options="formattedClasses" @close="open = false" @save="handleSave">
    </side-modal>
  </section>
</template>

<script setup>
import SideModal from '../layouts/Modais/SideModal.vue';
import ScheduleCalendar from '@/components/ScheduleCalendar.vue';
import { ref, reactive, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useSchedule } from '../composables/schedule.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();
const openSchedule = useSchedule('openAppointments', route.params.id);
const closeSchedule = useSchedule('closeAppointments', route.params.id);

const classes = ref([]);
const selectedDay = ref(null);
const open = ref(false);

const attributesProp = reactive([
  {
    dates: openSchedule.appointmentsDay,
    content: '',
    highlight: {
      class: 'highlight'
    }
  }
]);

const handleSave = async (index) => {
  const payload = {
    name: userStore.user.name,
    date: classes.value[index].date
  };

  try {
    await closeSchedule
      .saveAppointments([payload])
      .then(openSchedule.deleteAppointments(classes.value[index].id));
    return (open.value = false);
  } catch (e) {
    console.log(e);
  }
};

const handleModal = async (date) => {
  if (!(date.getDate() >= new Date().getDate())) return;

  const data = await openSchedule.getHourClasses(date);
  classes.value = data;
  open.value = true;
  return (selectedDay.value = date);
};

const formattedClasses = computed(() => {
  return classes.value.map(({ date }, index) => ({
    label: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
    value: index
  }));
});
</script>

<style lang="less" scoped>
#view-schedule-class {
  width: 100%;
  padding-top: 3rem;

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
