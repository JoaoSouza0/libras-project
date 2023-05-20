<template>
  <nav id="nav-bar">
    <div class="container">
      <RouterLink to="/">
        <div class="img" @click="signOut">
          <img src="@/assets/helpers-logo.svg" alt="helpers logo" />
        </div>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore.js';

const userStore = useUserStore();

const signOut = async () => {
  console.log(signOut);

  //TODO: REMOVE SIGNOUT
  // await userStore.signOut();  
};
</script>

<style lang="less" scoped>
#nav-bar {
  width: 100%;
  background-color: var(--text-primary);

  .container {
    margin: 0 auto;
    padding: 2rem;
    width: 80%;

    .img {
      max-width: 14.4rem;
    }
  }
}
</style>
