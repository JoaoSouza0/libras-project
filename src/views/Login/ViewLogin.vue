<template>
  <user-login-form @submit="handleSubmit">
    <template #head>
      <h1>Bem-vindo de volta!</h1>
      <p>Ainda não é cadastrado? <a @click.prevent="createAccount">Crie sua conta</a></p>
    </template>

    <template #button>
      <div class="user-term">
        <base-button>Entrar</base-button>
      </div>
    </template>
  </user-login-form>
</template>

<script setup>
import userLoginForm from '@/components/Layout/Forms/userLogin.vue';
import { useLoginStore } from '../../stores/LoginStore';
import { useRouter } from 'vue-router';

const userStore = useLoginStore();
const router = useRouter();

const createAccount = () => {
  return router.push({ name: 'register' });
};

const handleSubmit = (data) => {
  if (!data.valid) return;

  const result = userStore.signIn(data);

  if (result.success) {
    console.log('success');
  } else {
    console.log('failure');
  }
};
</script>

<style lang="less" scoped>
.user-term {
  display: flex;
  justify-content: end;
  margin-top: 8.3rem;
}

h1 {
  margin-bottom: 1.6rem;
}

p {
  color: var(--text-dark);
  font-size: 2rem;
  margin-bottom: 5rem;
}
</style>
