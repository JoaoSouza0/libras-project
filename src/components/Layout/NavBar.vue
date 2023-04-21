<template>
  <nav id="nav-bar">
    <div class="container">
      <div class="img">
        <img src="@/assets/helpers-logo.svg" alt="helpers logo" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const showMobileNav = ref(true)
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
