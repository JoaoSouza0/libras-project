<template>
  <section>
    <img src="" alt="" />
    <div>
      <h1></h1>
      <p><a href=""></a></p>

      <base-input
        v-model="email"
        :valid="true"
        label="email"
        placeholder="example@email.com"
      />

      <div>
        <label for=""></label>
        <input type="text" />
      </div>

      <div>
        <label for=""></label>
        <input type="text" />
      </div>

      <div>
        <!-- checkbox -->
      </div>

      <div>
        <p></p>
        <button></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
</script>

<style lang="less"></style>
