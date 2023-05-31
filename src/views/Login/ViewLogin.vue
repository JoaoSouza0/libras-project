<template>
  <user-login-form ref="formRef" @submit="handleSubmit">
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
import { REGISTER } from '@/consts/publicRoutes.js';
import { TEACHER_LIST, USER_COMPLEMENT_DATA } from '@/consts/privateRoutes.js';

import userLoginForm from '@/layouts/Forms/userLogin.vue';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const formRef = ref(null);

const createAccount = () => {
  return router.push({ name: REGISTER.NAME });
};

const handleSubmit = async (data) => {
  if (!data.valid) return;
  const response = await userStore.signIn(data);

  if (!response.success)
    return formRef.value.setEmailCustomValidity(`CODE: ${response.code}
    MESSAGE: ${response.message}`);

  const { body } = response;

  if (!body.complemented_data)
    return router.push({ name: USER_COMPLEMENT_DATA.NAME, params: { id: body.id } });

  return body.type
    ? router.push({ name: USER_COMPLEMENT_DATA.NAME, params: { id: body.id  } })
    : router.push({ name: TEACHER_LIST.NAME });
};
</script>

<style lang="less" scoped>
.user-term {
  display: flex;
  justify-content: end;
  margin-top: 1.3rem;
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
