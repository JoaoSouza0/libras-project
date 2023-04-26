<template>
  <form ref="refForm" id="register-user-form" @submit.prevent="handleSubmit">
    <div class="img">
      <img src="@/assets/register-image.svg" alt="jovem fazendo sinal de foto" />
    </div>

    <div class="content">
      <slot name="head" />

      <base-input
        ref="refEmail"
        class="text-input"
        required
        v-model="email"
        id="email"
        type="email"
        autocomplete="off"
        label="Email"
        placeholder="example@email.com"
      />

      <password-input
        ref="refPassword"
        class="text-input"
        id="password"
        v-model="password"
        autocomplete="off"
        label="Senha"
        placeholder="Senha"
      />

      <password-input
        class="text-input"
        id="confirm-password"
        v-model="confirmPassword"
        autocomplete="off"
        label="Confirmar Senha"
        placeholder="Confirmar senha"
      />

      <radio-input class="radio-input" v-model="student" :options="radioOptions" />

      <slot name="button" />
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const refForm = ref(null);
const refEmail = ref(null);
const refPassword = ref(null);

const radioOptions = [
  {
    value: 0,
    label: 'Sou estudantes'
  },
  {
    value: 1,
    label: 'Sou professor'
  }
];

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const student = ref(0);

const handleSubmit = () => {
  refPassword.value.setCustomValidity('teste joao');
};

//create validator
</script>

<style lang="less" scoped>
#register-user-form {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  .img {
    width: 100%;
    max-width: 80rem;

    img {
      width: 100%;
    }
  }

  .content {
    width: 72%;
    max-width: 51.5rem;

    .text-input {
      margin-bottom: 2.4rem;
    }

    .radio-input {
      margin-top: 0.8rem;
      margin-bottom: 4.8rem;
    }
  }
}
</style>
