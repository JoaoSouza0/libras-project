<template>
  <section id="view-create-class">
    <div class="next-classes"></div>
    <div class="calendar">
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
import { ref, reactive, onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useScheduleStore } from '@/stores/ScheduleStore';

const route = useRoute();
const scheduleStore = useScheduleStore();

const open = ref(false);
const selectedDay = ref(null);

const attributesProp = reactive([
  {
    dates: [],
    content: '',
    highlight: {
      class: 'highlight' // Circle class
    }
  }
]);

const classes = ref([]);
const formattedClasses = computed(() => {
  return classes.value.map((item) => item.date).sort((a, b) => a - b);
});

const handleModal = async (date) => {
  const data = await scheduleStore.getHourClasses(route.params.id, date);
  classes.value = data;
  open.value = true;
  console.log(classes.value.length);

  return (selectedDay.value = date);
};

const handleSaveHours = (date) => {
  scheduleStore.saveOpenAppointments(route.params.id, date);
  attributesProp[0].dates.push(selectedDay.value);
  return (open.value = false);
};

const handleRemove = (key) => {
  scheduleStore.deleteOpenAppointments(route.params.id, classes.value[key].id);
  console.log(classes.value.length);
  return;
};

onBeforeMount(async () => {
  await scheduleStore.getOpenAppointments(route.params.id);
  attributesProp[0].dates = scheduleStore.openAppointmentsDay;
});
</script>

<style lang="less" scoped>
#view-create-class {
  width: 100%;

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

  .button {
    transform: scale(0.233);
    position: relative;
    top: -26.6px;
    left: 22%;
  }
}
</style>
