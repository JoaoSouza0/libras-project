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
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid black;
  --day-border-highlight: 1px solid black;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;

  & .vc-header {
    margin: 20px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    .is-not-in-month {
      display: none !important;
    }
    &.is-not-in-month.in-next-month {
      display: none;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  .highlight {
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: var(--link-primary);
  }

  .vc-day.in-month {
    background-color: red;
  }

  .vc-arrow,
  .vc-title {
    background: none;
  }

  .calendar-day {
    height: 100%;
    cursor: pointer;
  }
}
</style>
