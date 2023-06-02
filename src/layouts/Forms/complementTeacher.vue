<template>
  <form
    id="complement-teacher-form"
    class="content"
    novalidate
    ref="refForm"
    @submit.prevent="handleSubmit"
  >
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

        <VDatePicker v-model="userData.birthDay" :masks="{ L: 'DD/MM/YYYY' }" mode="date">
          <template #default="{ inputValue, inputEvents }">
            <base-input
              ref="startRef"
              class="date-input"
              label="Data de nascimento"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </VDatePicker>

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

        <base-input
          ref="refAvatar"
          v-model="userData.photo"
          class="text-input"
          id="avatar"
          type="file"
          label="Foto de perfil:"
          required
          @onChange="handlePhotoUpload"
        >
          <template #icon>
            <div class="icon-wrapper">
              <img src="@/assets/camera.svg" alt="" srcset="" />
            </div>
          </template>
        </base-input>
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
          v-if="userData.classType != enumClassType.remote"
          ref="refNeighborhood"
          class="text-input"
          v-model="userData.street"
          id="neighborhood"
          type="number"
          label="CEP:"
          pattern="[0-9]"
          required
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
import { reactive, ref, toRaw } from 'vue';
import { enumClassType } from '@/consts/enums';
import LocationService from '@/service/LocationService.js';

const refForm = ref(null);
const filePhoto = ref(null);
const refNeighborhood = ref(null);

const options = [
  {
    label: 'remoto',
    value: enumClassType.remote
  },
  {
    label: 'presencial',
    value: enumClassType.inPerson
  },

  {
    label: 'presencial e remoto',
    value: enumClassType.bothClass
  }
];

const userData = reactive({
  name: null, //text
  photo: '',
  street: null, //text
  platform: null, //text
  resume: null, //text
  contact: null, //number
  lat: null,
  lng: null,
  neighborhood: null,
  classType: 0, //select com 3 opções,
  birthDay: null // date
});

const handleLocation = async (input) => {
  if (!input) return;
  try {
    const locationService = new LocationService();
    const response = await locationService.getStreetLocationData(userData.street);

    const { body } = response;
    userData.lat = Number(body?.geometry.lat);
    userData.lng = Number(body?.geometry.lng);
    return userData;
  } catch (e) {
    return refNeighborhood.value.setCustomValidity(e.message);
  }
};

const handlePhotoUpload = (e) => {
  const fr = new FileReader();
  fr.readAsDataURL(e.target.files[0]);
  filePhoto.value = e.target.files[0];
};

const handleSubmit = async () => {
  const data = await handleLocation(userData.street);
  const rawUserData = toRaw(data);
  emit('submit', {
    valid: refForm.value.reportValidity(),
    data: {
      ...rawUserData,
      complemented_data: true
    },
    profileImage: filePhoto.value
  });
};

const emit = defineEmits(['submit']);
</script>

<style lang="less" scoped>
#complement-teacher-form {
  padding-top: 3.5rem;
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
      justify-content: flex-start;
      flex-direction: column;
    }
    .text-input,
    .date-input {
      margin-bottom: 1.5rem;
      max-width: 51.5rem;
    }

    .icon-wrapper {
      height: 102%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 0.8rem 0.8rem 0;

      img {
        width: 42%;
        cursor: pointer;
      }
    }
  }
}
</style>
