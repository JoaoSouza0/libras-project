<template>
  <div id="view-schedule-class">
    <div class="head">
      <h2 class="h2">Custom Calendars</h2>
      <p class="text-lg font-medium text-gray-600 mb-6">
        Roll your own calendars using scoped slots
      </p>
    </div>

    <div class="content">
      <div class="calendar">
        <v-calendar
          class="custom-calendar"
          :masks="data.masks"
          :attributes="attributesProp"
          :min-date="new Date()"
          disable-page-swipe
          expanded
        >
          <template v-slot:day-content="{ day }">
            <div class="calendar-day" @click="getClasses(day.date)">
              <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
              <div class="flex-grow overflow-y-auto overflow-x-auto"></div>
            </div>
          </template>
        </v-calendar>
      </div>

      <div class="side-bar">
        <p>Horários disponiveis nesse dia.</p>
        <div v-for="(item, index) in classes" v-bind:key="index">
          <a @click.prevent>{{ new Date(item.date) }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, ref } from 'vue';
import ScheduleService from '@/service/ScheduleService';

const scheduleStore = useScheduleStore();

const route = useRoute();
const month = new Date().getMonth();
const year = new Date().getFullYear();
const classes = ref([]);

const attributesProp = ref([
  {
    // Boolean
    dates: scheduleStore.openAppointmentsDay,
    content: '',
    highlight: {
      class: 'highlight' // Circle class
    }
  }
]);

const data = ref({
  attributes: [
    {
      key: 2,
      /* customData: [
        {
          title: 'Lunch with mom',
          class: 'bg-red-600 text-white'
        }
      ], */
      dates: new Date(year, month, 1)
    },
    {
      key: 1,
      customData: {
        title: 'Take Noah to basketball practice',
        class: 'bg-blue-500 text-white'
      },
      dates: new Date(year, month, 1)
    },
    {
      key: 3,
      customData: {
        title: "Noah's basketball game.",
        class: 'bg-blue-500 text-white'
      },
      dates: new Date(year, month, 5)
    },
    {
      key: 4,
      customData: {
        title: 'Take car to the shop',
        class: 'bg-indigo-500 text-white'
      },
      dates: new Date(year, month, 1)
    },
    {
      key: 4,
      customData: {
        title: 'Meeting with new client.',
        class: 'bg-teal-500 text-white'
      },
      dates: new Date(year, month, 7)
    },
    {
      key: 5,
      customData: {
        title: "Mia's gymnastics practice.",
        class: 'bg-pink-500 text-white'
      },
      dates: new Date(year, month, 11)
    },
    {
      key: 6,
      customData: {
        title: 'Cookout with friends.',
        class: 'bg-orange-500 text-white'
      },
      dates: { months: 5, ordinalWeekdays: { 2: 1 } }
    },
    {
      key: 7,
      customData: {
        title: "Mia's gymnastics recital.",
        class: 'bg-pink-500 text-white'
      },
      dates: new Date(year, month, 22)
    },
    {
      key: 8,
      customData: {
        title: 'Visit great grandma.',
        class: 'bg-red-600 text-white'
      },
      dates: new Date(year, month, 25)
    }
  ]
});

const getClasses = async (day) => {
  classes.value = await scheduleStore.getHourClasses(route.params.id, day);
};

const timeList = computed(() => {
  return scheduleStore.openAppointments;
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

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .calendar {
      width: 65%;
    }

    .side-bar {
      background-color: white;
      border: 1px solid #cbd5e1;
      width: 30%;

      p {
        text-align: center;
        padding: 1.5rem;
        border-bottom: 1px solid #cbd5e1;
        font-size: 2rem;
      }
    }
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
}
</style>
