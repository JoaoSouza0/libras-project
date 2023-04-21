<template>
  <user-register>
    <template #head>
      <div class="head-content">
        <h1>Criar conta</h1>
        <p>Já é cadastrado? <a @click.prevent="login">Entre na sua conta.</a></p>
      </div>
    </template>
    <template #button>
      <div class="user-term">
        <p>Ao prosseguir, você concorda com nossos <a>Termos de uso</a></p>
        <base-button>Cadastre-se</base-button>
      </div>
    </template>
  </user-register>
</template>

<script setup>
import userRegister from '@/components/Layout/Forms/userRegister.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const login = () => {
  return router.push({ name: 'login' })
}
//colorar os métodos de registro aqui
</script>

<style lang="less" scoped>
.head-content {
  h1 {
    margin-bottom: 1.6rem;
  }

  & > p {
    color: var(--text-dark);
    font-size: 2rem;
    margin-bottom: 3.4rem;
  }
}
.user-term {
  display: flex;
  align-items: center;
  justify-content: space-between;

  p,
  a {
    margin-right: 2rem;
    font-size: 1.6rem;
  }
}
</style>
