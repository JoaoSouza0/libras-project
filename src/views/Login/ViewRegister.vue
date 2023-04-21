<template>
  <user-register>
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

//colorar os métodos de registro aqui
</script>

<style lang="less" scoped>
.user-term {
  display: flex;
  align-items: center;
  justify-content: space-between;

  p,
  a {
    margin-right: 2.0rem;
    font-size: 1.6rem;
  }
}
</style>
