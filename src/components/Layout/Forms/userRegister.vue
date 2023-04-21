<template>
  <form id="register-user-form">
    <div class="img">
      <img src="@/assets/register-image.svg" alt="jovem fazendo sinal de foto" />
    </div>

    <div class="content">
      <h1>Criar conta</h1>
      <p>Já é cadastrado? <a>Entre na sua conta.</a></p>

      <base-input
        class="text-input"
        :valid="true"
        v-model="email"
        id="email"
        type="email"
        autocomplete="off"
        label="Email"
        placeholder="example@email.com"
      />

      <password-input
        class="text-input"
        id="password"
        v-model="password"
        :valid="true"
        autocomplete="off"
        label="Senha"
        placeholder="Senha"
      />

      <password-input
        class="text-input"
        id="confirm-password"
        v-model="confirmPassword"
        :valid="true"
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
import { ref } from 'vue'

const radioOptions = [
  {
    value: 0,
    label: 'Sou estudantes'
  },
  {
    value: 2,
    label: 'Sou professor'
  }
]

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const student = ref(0)

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
    max-width: 800px;

    img {
      width: 100%;
    }
  }

  .content {
    h1 {
      margin-bottom: 16px;
    }

    & > p {
      color: var(--text-dark);
      font-size: 2rem;
      margin-bottom: 64px;
    }
    .text-input {
      margin-bottom: 24px;
    }

    .radio-input {
      margin-top: 8px;
      margin-bottom: 48px;
    }
  }
}
</style>
