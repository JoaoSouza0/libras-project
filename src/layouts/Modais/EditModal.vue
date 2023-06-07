<template>
  <base-modal>
    <div id="modal-container" class="container">
      <nav>
        <a @click="$emit('close')">
          <img src="@/assets/close-icon.svg" alt="close icon" srcset="" />
        </a>
      </nav>
      <div class="content">
        <h2>Editar horários disponíveis</h2>

        <label>Adicionar horários</label>
        <div class="actions">
          <base-button @click="addDay" class="button" :theme="false">+</base-button>
          <VDatePicker v-model="date" mode="time" locale="pt" :rules="rules" is24hr />
        </div>
        <div class="available-time">
          <label>Horários disponíveis</label>
          <div>
            <span v-for="(day, key) in formattedAvailableDays" :key="key">
              <base-button @click="removeDay(key)" class="button" :theme="false">-</base-button>
              {{ day }}</span
            >
          </div>

          <base-button @click="save" class="save-button">salvar</base-button>
        </div>
      </div>
    </div>
  </base-modal>
</template>

<script setup>
import { computed, ref, toRaw } from 'vue';

const props = defineProps({
  selectedDay: Date,
  timeList: {
    type: Array,
    default: () => []
  }
});

const rules = ref({
  minutes: { interval: 5 }
});

const date = ref(props.selectedDay);
const availableDays = ref([...props.timeList]);

const formattedAvailableDays = computed(() => {
  return availableDays?.value.map(
    (date) => `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
  );
});

const addDay = () => {
  const availableDaysRaw = toRaw(availableDays);
  const hasDate = availableDaysRaw._rawValue.some(
    (item) => item.toISOString() == date.value.toISOString()
  );
  if (hasDate) return;
  availableDays.value.push(date.value);
  return availableDays.value.sort((a, b) => a - b);
};

const removeDay = (key) => {
  availableDays.value.splice(key, 1);
  emit('remove', key);
};
const save = () => {
  const availableDaysRaw = toRaw(availableDays)._rawValue;
  const onlyNewData = availableDaysRaw.filter((item) => !props.timeList.includes(item));

  emit(
    'save',
    onlyNewData.map((item) => ({ date: item }))
  );
};

const emit = defineEmits(['close', 'save', 'remove']);
</script>

<style lang="less">
@import '@/less/modules/components/EditModal.less';

#modal-container {
  min-width: 45rem;
  min-height: 60rem;
  background: white;
  margin: auto;
  align-self: center;

  nav {
    background-color: var(--text-primary);
    padding: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      width: 16px;
      height: 16px;
    }
  }

  .content {
    padding: 0 4rem;

    h2 {
      color: var(--text-primary);
      text-align: center;
      margin-top: 4rem;
      margin-bottom: 2.4rem;
    }

    label,
    .available-time span {
      color: var(--text-dark);
      display: block;
      font-size: 1.6rem;
      margin-bottom: 1.6rem;
    }

    span {
      margin-bottom: 0.8rem;
    }

    .actions {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 2.8rem;
    }

    .button {
      width: 24px;
      height: 24px;
      padding: unset;
      padding-bottom: 5px;
      margin-right: 1.6rem;
    }

    .available-time {
      .button {
        margin-right: 0.8rem;
      }

      & > div {
        height: 20rem;
        overflow: auto;
      }

      .save-button {
        margin: 3rem 0;
        width: 9.8rem;
        padding: 1rem;
        float: right;
      }
    }
  }
}
</style>
