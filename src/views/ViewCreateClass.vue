<template>
  <section id="view-create-class">
    <div class="next-classes"></div>
    <div class="calendar">
      <ScheduleCalendar>
        <template #day-content>
          <div class="date-container">
            <VDatePicker id="online" v-model="range" mode="time" :rules="rules" />
            <base-button @click="teste" class="button">adicionar</base-button>
          </div>
        </template>
      </ScheduleCalendar>
    </div>

    <edit-modal></edit-modal>
    
  </section>
</template>

<script setup>
import ScheduleCalendar from '@/components/ScheduleCalendar.vue';
import EditModal from '@/layouts/Modais/EditModal.vue';
import { ref } from 'vue';

const range = ref(new Date(2020, 0, 6));
const rules = ref({
  minutes: { interval: 5 }
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
