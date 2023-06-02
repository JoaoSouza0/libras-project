<template>
  <div id="schedule-calendar">
    <div class="calendar">
      <v-calendar
        class="custom-calendar"
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
        <a @click.prevent>{{ item.date }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useScheduleStore } from '@/stores/ScheduleStore';
const scheduleStore = useScheduleStore();

const props = defineProps({
  attributesProp: Array,
  idUser: String
});

const classes = ref([]);

const getClasses = async (day) => {
  classes.value = await scheduleStore.getHourClasses(props.idUser, day);
};
</script>

<style lang="less">
#schedule-calendar {
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
</style>
