<template>
  <form id="complement-teacher-form" class="content" ref="refForm" @submit.prevent="handleSubmit">
    <slot name="head" />

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
          id="platform"
          type="textarea"
          label="Breve resumo sobre você:"
          required
        />

        <base-input
          ref="refNeighborhood"
          class="text-input"
          v-model="userData.neighborhood"
          id="neighborhood"
          type="text"
          label="Bairro:"
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
import { reactive, ref } from 'vue';
import { enumClassType } from '@/consts/enums';

const refForm = ref(null);
const refPassword = ref(null);
const refEmail = ref(null);

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
  neighborhood: null, //text
  platform: null, //text
  resume: null, //text
  contact: null, //number
  lat: null,
  lng: null,
  //salvar os dados de location tbm
  classType: 0, //select com 3 opções,
  birthDay: null // date
});

const handleSubmit = () => {
  emit('submit', {
    valid: refForm.value.reportValidity(),
    ...userData
  });
};

const setEmailCustomValidity = (message) => refEmail.value.setCustomValidity(message);
const emit = defineEmits(['submit']);

defineExpose({ setEmailCustomValidity });
</script>

<style lang="less" scoped>
#complement-teacher-form {
  padding-top: 6.4rem;

  .content {
    padding: 6.4rem 6.6rem;
    display: flex;
    justify-content: space-around;
    flex-direction: row;

    .section-first,
    .section-second {
      width: 45%;
    }
    .text-input {
      margin-bottom: 1.5rem;
      max-width: 51.5rem;
    }
  }
}
</style>
