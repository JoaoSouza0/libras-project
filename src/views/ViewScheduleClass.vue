<template>
  <div id="view-schedule-class">
    <div class="head">
      <h2 class="h2">Agendamento de horario</h2>
    </div>
    <renderedCalendar />
  </div>
</template>

<script setup>
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useRoute } from 'vue-router';
import { computed, h, onBeforeMount, ref } from 'vue';
import ScheduleCalendar from '@/components/ScheduleCalendar.vue';

const scheduleStore = useScheduleStore();

const route = useRoute();

const renderedCalendar = computed(() => {
  return scheduleStore.openAppointmentsDay.length
    ? h(ScheduleCalendar, {
        attributesProp: [
          {
            dates: scheduleStore.openAppointmentsDay,
            content: '',
            highlight: {
              class: 'highlight' // Circle class
            }
          }
        ],
        idUser: route.params.id
      })
    : h('div');
});

onBeforeMount(async () => {
  await scheduleStore.getOpenAppointments(route.params.id);
});
</script>

<style lang="less" scoped>
#view-schedule-class {
  width: 100%;
  min-width: 130rem;
  padding-top: 3rem;

  .head {
    padding-bottom: 2rem;
  }
}
</style>
