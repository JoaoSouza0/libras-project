<template>
  <nav id="nav-bar">
    <div class="container">
      <RouterLink to="/">
        <div class="img" @click="signOut">
          <img src="@/assets/helpers-logo.svg" alt="helpers logo" />
        </div>
      </RouterLink>

      <div class="call-action" v-if="route.name === HOME.NAME">
        <a @click.prevent="handleScroll">Sobre nós</a>
        <RouterLink :to="{ name: LOGIN.NAME }">Entrar</RouterLink>
        <base-button @click="pushRegister" class="nav-btn" :theme="false">Criar conta</base-button>
      </div>

      <a v-if="route.meta.requireAuth && route.name !== TEACHER_LIST.NAME" @click="router.back()">
        <img src="@/assets/close-icon.svg" alt="close icon" srcset="" />
      </a>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore.js';
import { REGISTER, HOME, LOGIN } from '@/consts/publicRoutes.js';
import { TEACHER_LIST } from '@/consts/privateRoutes.js';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const handleScroll = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
};

const pushRegister = () => {
  return router.push({ name: REGISTER.NAME });
};

const signOut = async () => {
  //TODO: REMOVE SIGNOUT
  //await userStore.signOut();

  console.log(route.name, HOME.NAME);
};
</script>

<style lang="less" scoped>
#nav-bar {
  width: 100%;
  background-color: var(--text-primary);

  @media @smartphone {
    .container {
      width: unset !important;
    }
    .call-action {
      justify-content: space-between;
      align-items: end;
      a {
        display: none;
      }
    }
  }

  .container {
    margin: 0 auto;
    padding: 2rem;
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .call-action {
      display: flex;
      align-items: center;

      .nav-btn {
        width: 17rem;
        height: 5rem;
        line-height: 0;
        border-radius: 1.6rem;
      }
      .nav-btn:hover {
        background-color: var(--link-primary);
      }

      a {
        margin-right: 3.2rem;
        font-size: 2.4rem;
        color: white;
        text-decoration: none;
        font-weight: 300;
      }

      a:hover {
        color: var(--link-primary);
      }
    }
    .img {
      max-width: 14.4rem;
    }
  }
}
</style>
