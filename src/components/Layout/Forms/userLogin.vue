<template>
  <form id="login-user-form">
    <div class="img">
      <img src="@/assets/login-image.svg" alt="jovem fazendo sinal de foto" />
    </div>

    <div class="content">
      <h1>Bem-vindo de volta!</h1>
      <p>Ainda não é cadastrado? <a>Crie sua conta</a></p>

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

      <slot name="button" />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const student = ref(0)
</script>

<style lang="less" scoped>
#login-user-form {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  .img {
    width: 50%;
    max-width: 625px;

    img {
      width: 100%;
    }
  }
  .content {
    width: 50%;
    max-width: 515px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      margin-bottom: 16px;
    }

    & > p {
      color: var(--text-dark);
      font-size: 2rem;
      margin-bottom: 56px;
    }
    .text-input {
      margin-bottom: 24px;
    }
  }
}
</style>
