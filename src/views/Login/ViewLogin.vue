<template>
  <userLoginVue>
    <template #button>
      <div class="user-term">
        <base-button>Entrar</base-button>
      </div>
    </template>
  </userLoginVue>
</template>

<script setup>
import userLoginVue from '@/components/Layout/Forms/userLogin.vue'
</script>

<style lang="less" scoped>
.user-term {
  display: flex;
  justify-content: end;
  margin-top: 8.3rem;
}
</style>
