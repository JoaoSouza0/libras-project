<template>
  <nav-bar />
  <section id="view-container">
    <router-view />
  </section>
</template>

<script setup>
import NavBar from '@/components/Layout/NavBar.vue'
</script>

<style lang="less">
@import '@/less/main.less';

#view-container {
  width: 80%;
  margin: 0 auto;
}
</style>
