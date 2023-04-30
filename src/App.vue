<template>
  <nav-bar />
  <section id="view-container">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script setup>
import NavBar from '@/components/Layout/NavBar.vue';
</script>

<style lang="less">
@import '@/less/main.less';

#view-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  margin: 0 auto;
  min-height: 92.5svh;

  .slide-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    opacity: 0;
  }

  .slide-leave-to {
    transform: translateX(100%);
  }
}
</style>
