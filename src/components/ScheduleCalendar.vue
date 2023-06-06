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
          <div class="calendar-day" @click="$emit('open', day.date)">
            <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
            <div class="flex-grow overflow-y-auto overflow-x-auto"></div>
          </div>
        </template>
      </v-calendar>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  attributesProp: Array,
  idUser: String
});

defineEmits(['open']);
</script>

<style lang="less">
#schedule-calendar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

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

::-webkit-scrollbar-track {
  display: none;
}
/deep/ & .custom-calendar.vc-container {
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
    z-index: 0;
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

  .closed-day {
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: red;
  }

  .vc-day.in-month {
    background-color: #eaeaea;
    transition: transform 0.3s ease;
    transform-origin: center center;
  }

  .zoomed {
    transform: scale(3);
    z-index: 1000000000;
  }

  .vc-arrow,
  .vc-title {
    background: none;
  }

  .calendar-day {
    height: 100%;
    cursor: pointer;
  }

  .close-day {
    display: none;
  }
}
</style>
