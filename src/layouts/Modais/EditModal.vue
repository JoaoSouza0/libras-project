<template>
  <Teleport to="body">
    <base-modal>
      <div id="modal-container" class="container">
        <nav>
          <a @click="$emit('close')">
            <img src="@/assets/close-icon.svg" alt="close icon" srcset="" />
          </a>
        </nav>
        <div class="content">
          <h2>Editar horários disponíveis</h2>
          <VDatePicker v-model="date" mode="time" locale="pt" is24hr />
        </div>
      </div>
    </base-modal>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '../NavBar.vue';

const date = ref(new Date());
</script>

<style lang="less">
@import '@/less/modules/teste.less';

#modal-container {
  min-width: 45rem;
  min-height: 60rem;
  background: white;

  nav {
    background-color: var(--text-primary);
    padding: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      width: 16px;
      height: 16px;
    }
  }

  .content {
    padding: 0 4rem;

    h2 {
      color: var(--text-primary);
      text-align: center;
      margin-top: 4rem;
      margin-bottom: 2.4rem;
    }
  }
}
</style>
