<template>
  <section id="view-teacher-complement-data">
    <complementTeacher ref="formRef" @submit="completeData">
      <template #head>
        <div class="head-content">
          <h1>Concluir Cadastro</h1>
          <p>
            Precisamos de mais algumas informações para concluir o seu cadastro. É fácil e rápido!
          </p>
        </div>
      </template>
      <template #button>
        <div class="complete-button">
          <base-button>Concluir cadastro</base-button>
        </div>
      </template>
    </complementTeacher>
  </section>
</template>

<script setup>
import complementTeacher from '@/layouts/Forms/complementTeacher.vue';

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';

const route = useRoute();
const userStore = useUserStore();
const formRef = ref(null);

const completeData = (data) => {
  const userId = route.params.id;
  userStore.update(data, userId);
};
</script>

<style lang="less" scoped>
#view-teacher-complement-data {
  width: 80%;

  .head-content {
    h1 {
      padding-bottom: 0.8rem;
    }
    p {
      font-size: 2rem;
      color: var(--text-dark);
    }
  }

  .complete-button {
    padding: 0 6.6rem;
    padding-bottom: 4rem;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
}
</style>
