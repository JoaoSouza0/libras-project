<template>
  <section id="view-list">
    <h1>Encontramos {{ teacherList.length }} professores na sua região!</h1>
    <div class="informative">
      <img src="@/assets/location.svg" />
      <label>perto de {{ address }} </label>
    </div>

    <base-slide-swiper
      :list="teacherList"
      @next="handlePage"
      @prev="handlePage"
      @selected="handlePage"
    >
      <template #list-item="{ index }">
        <teacher-card :class="index === currentItem && 'active'" />
      </template>
      <template #pagination-informative>
        <div class="pagination">
          <span>
            {{ currentItem + 1 }}
          </span>
        </div>
      </template>
    </base-slide-swiper>
  </section>
</template>

<script setup>
import TeacherCard from '@/components/TeacherCard.vue';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import LocationService from '../service/LocationService';
import BaseSlideSwiper from '../components/Base/BaseSlideSwiper.vue';

const teacherList = ref([]);
const currentItem = ref(0);

const route = useRoute();
const address = ref(route.query.address);

const handlePage = (page) => {
  return (currentItem.value = page);
};

onMounted(async () => {
  teacherList.value = new Array(20);
  //pegar latitude e longitude com o endereço puxando da api
  //Tipo de aula para filtrar
  //const locationService = new LocationService('users');
  //teacherList.value.push(await locationService.getByRadius());
});

</script>

<style lang="less" scoped>
#view-list {
  margin-top: 8rem;
  width: 70svw;

  .active {
    outline: 2px solid var(--link-primary);
  }
  .informative {
    padding-bottom: 3.2rem;
    padding-top: 2.6rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
    }
  }

  .content {
    margin-bottom: 6.6rem;
  }

  .pagination {
    color: var(--text-primary);
    background-color: var(--input-primary);
    width: 28px;
    height: 28px;
    padding: 2px;
    border-radius: 50%;
    margin: 0 2.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 2rem;
    }
  }
}
</style>
