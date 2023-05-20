<template>
  <section id="view-list">
    <p>{{ teacherList }}</p>
  </section>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LocationService from '../service/LocationService';

const teacherList = ref([]);

const route = useRoute();


onMounted(async () => {
  //pegar latitude e longitude com o endereço puxando da api
  //Tipo de aula para filtrar
  const locationService = new LocationService('users');
  teacherList.value.push(await locationService.getByRadius());
  console.log('hi')
});
</script>

<style lang="less" scoped>
#view-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 3.2rem;
  }

  p {
    max-width: 85.6rem;
    font-size: 2rem;
    margin-bottom: 4.7rem;
    text-align: center;
    color: var(--text-primary);
  }

  & > div {
    width: 70rem;

    .search-input {
      margin-bottom: 1.7rem;
    }

    .icon-wrapper {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--text-primary);
      border-radius: 0 0.8rem 0.8rem 0;

      img {
        width: 42%;
        cursor: pointer;
      }
    }

    .radio-input {
      margin-bottom: 8.1rem;
    }
  }

  .img {
    min-width: 85.6rem;
    border-bottom: 3px solid black;
  }
}
</style>
