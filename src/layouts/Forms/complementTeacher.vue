<template>
  <form id="complement-teacher-form" class="content" ref="refForm" @submit.prevent="handleSubmit">
    <div class="head-content">
      <h1>Concluir Cadastro</h1>
      <p>Precisamos de mais algumas informações para concluir o seu cadastro. É fácil e rápido!</p>
    </div>
    <div class="content">
      <div class="section-first">
        <base-input
          ref="refName"
          class="text-input"
          v-model="userData.name"
          id="name"
          type="text"
          label="Nome completo: "
          required
        />

        <base-input
          ref="refDatePicker"
          v-model="userData.birthDay"
          class="text-input"
          label="Data de nascimento:"
          placeholder="..."
          type="date"
        />

        <select-input
          v-model="userData.classType"
          class="text-input"
          label="Preferência de ambiente:"
          :options="options"
        />

        <base-input
          ref="refContact"
          class="text-input"
          v-model="userData.contact"
          id="contact"
          type="number"
          label="Contato:"
          pattern="[0-9]"
          required
        />
      </div>

      <div class="section-second">
        <base-input
          ref="refResume"
          class="text-input textarea"
          v-model="userData.resume"
          id="resume"
          type="textarea"
          label="Breve resumo sobre você:"
          required
        />

        <base-input
          ref="refNeighborhood"
          class="text-input"
          v-model="userData.street"
          id="neighborhood"
          type="text"
          label="Logradouro:"
          required
          @onBlur="handleLocation"
        />

        <base-input
          v-if="userData.classType != enumClassType.inPerson"
          ref="refPlatform"
          class="text-input"
          v-model="userData.platform"
          id="platform"
          type="text"
          label="Plataforma preferida:"
          required
        />
      </div>
    </div>
    <slot name="button" />
  </form>
</template>

<script setup>
import { reactive, ref, toRaw, unref } from 'vue';
import { enumClassType } from '@/consts/enums';
import LocationService from '@/service/LocationService.js';

const refForm = ref(null);
const refDatePicker = ref(null);
const refNeighborhood = ref(null);

const options = [
  {
    label: 'presencial',
    value: enumClassType.inPerson
  },
  {
    label: 'remoto',
    value: enumClassType.remote
  },
  {
    label: 'presencial e remoto',
    value: enumClassType.bothClass
  }
];

const userData = reactive({
  name: null, //text
  street: null, //text
  platform: null, //text
  resume: null, //text
  contact: null, //number
  lat: null,
  lng: null,
  classType: 0, //select com 3 opções,
  birthDay: null // date
});

const handleLocation = async (input) => {
  if (!input) return;

  const locationService = new LocationService();
  const response = await locationService.getStreetLocationData(userData.street);

  if (!response.success) return refNeighborhood.value.setCustomValidity(response.message);

  const { body } = response;
  userData.lat = Number(body.lat);
  userData.lng = Number(body.lon);
  return userData;
};

const handleSubmit = async () => {
  const rawUserData = toRaw(userData);
  emit('submit', {
    valid: refForm.value.reportValidity(),
    ...rawUserData,
    complemented_data: true
  });
};

const emit = defineEmits(['submit']);
</script>

<style lang="less" scoped>
#complement-teacher-form {
  padding-top: 6.4rem;
  .head-content {
    h1 {
      padding-bottom: 0.8rem;
    }
    p {
      font-size: 2rem;
      color: var(--text-dark);
    }
  }
  .content {
    padding: 4.4rem 6.6rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .section-first,
    .section-second {
      width: 45%;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }
    .text-input {
      margin-bottom: 1.5rem;
      max-width: 51.5rem;
    }
  }
}
</style>
