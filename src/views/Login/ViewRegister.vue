<template>
  <section id="register-user-form">
    <div class="img">
      <img src="@/assets/student-photo.svg" alt="jovem fazendo sinal de foto" />
    </div>

    <div class="content">
      <h1>Criar conta</h1>
      <p>Já é cadastrado?<a href="">Entre na sua conta.</a></p>

      <base-input
        class="form-input"
        :valid="true"
        v-model="email"
        id="email"
        type="email"
        autocomplete="off"
        label="Email"
        placeholder="example@email.com"
      />

      <password-input
        class="form-input"
        id="password"
        v-model="password"
        :valid="true"
        autocomplete="off"
        label="Senha"
        placeholder="Senha"
      />

      <password-input
        class="form-input"
        id="confirm-password"
        v-model="confirmPassword"
        :valid="true"
        autocomplete="off"
        label="Confirmar Senha"
        placeholder="Confirmar senha"
      />



      <!--  <div>
        <p></p>
        <button></button>
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
</script>

<style lang="less" scoped>
#register-user-form {
  display: flex;
  width: 100%;
  justify-content: center;

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

    p {
      color: var(--text-dark);
      font-size: 2rem;
      margin-bottom: 64px;
    }
    .form-input {
      margin-bottom: 24px;
    }
  }
}
</style>
