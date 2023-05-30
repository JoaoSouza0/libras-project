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
      <template #button>s
        <div class="complete-button">
          <base-button>Cancelar cadastro</base-button>
          <base-button :theme="false">Concluir cadastro</base-button>
        </div>
      </template>
    </complementTeacher>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import complementTeacher from '@/layouts/Forms/complementTeacher.vue';
const formRef = ref(null);

const completeData = (data) => {
  console.log(data);
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
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
}
</style>
