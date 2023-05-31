<template>
  <section id="view-complement-data">
    <renderForm ref="formRef" @submit="completeData" />
  </section>
</template>

<script setup>
import complementStudent from '@/layouts/Forms/complementStudent.vue';
import complementTeacher from '@/layouts/Forms/complementTeacher.vue';
import BaseButton from '@/components/Base/BaseButton.vue';

import { ref, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { HOME } from '@/consts/publicRoutes';
import { useUserStore } from '@/stores/UserStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const formRef = ref(null);

const renderForm = () => {
  return h(userStore.user.type ? complementTeacher : complementStudent, null, {
    button: () =>
      h(
        'div',
        {
          class: 'complete-button'
        },
        h(BaseButton, () => 'Concluir cadastro')
      )
  });
};

const completeData = (data) => {
  const userId = route.params.id;
  userStore.update({ ...data, type: userStore.user.type }, userId);

  return router.push({ name: HOME.NAME });
};
</script>

<style lang="less">
#view-complement-data {
  width: 80%;

  .complete-button {
    padding: 0 6.6rem;
    padding-bottom: 4rem;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
}
</style>
