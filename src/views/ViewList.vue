<template>
  <section id="view-list" v-if="teacherList.length">
    <h1>Encontramos {{ teacherList.length }} professores na sua região!</h1>
    <div class="informative">
      <img src="@/assets/location.svg" />
      <label>
        perto de:
        <span>{{ address }} </span>
      </label>
    </div>

    <base-slide-swiper
      :list="teacherList"
      @next="handlePage"
      @prev="handlePage"
      @selected="handlePage"
    >
      <template #list-item="{ item, index }">
        <teacher-card
          :id="item.id"
          :class="index === currentItem && 'active'"
          :resume="item.resume"
          :name="item.name"
          :profile="item.photo"
          :contact="Number(item.contact)"
        />
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
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import LocationService from '../service/LocationService';
import BaseSlideSwiper from '../components/Base/BaseSlideSwiper.vue';

const teacherList = ref([]);
const currentItem = ref(0);
const locationService = new LocationService();

const route = useRoute();
const address = ref(route.query.address);
const classType = ref(route.query.type);

const handlePage = (page) => {
  return (currentItem.value = page);
};

const handleAddress = async (address) => {
  const response = await locationService.getStreetLocationData(address);
  console.log(response);
  const { body } = response;
  return { lat: Number(body.geometry.lat), lng: Number(body.geometry.lng) };
};

onBeforeMount(async () => {
  const { lat, lng } = await handleAddress(address.value);
  teacherList.value = await locationService.getItemByRadius([lat, lng], classType.value, 'users');
});
</script>

<style lang="less" scoped>
#view-list {
  margin-top: 3rem;
  width: 70svw;

  .active {
    outline: 2px solid var(--link-primary);
  }
  .informative {
    padding-bottom: 2rem;
    padding-top: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
    }

    span {
      text-decoration: underline;
    }
  }

  .pagination {
    color: var(--text-primary);
    background-color: var(--input-primary);
    width: 28px;
    height: 28px;
    padding: 2px;
    border-radius: 50%;
    margin: 1.5rem 2.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 2rem;
    }
  }
}
</style>
