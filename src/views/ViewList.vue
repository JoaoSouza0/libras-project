<template>
  <div cl :style="{ alignSelf: isloading && 'center' }">
    <base-loader v-if="isloading" />
    <template v-else>
      <section id="view-list" v-if="teacherList.length">
        <h1>{{ formattedLabel }}!</h1>
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
      <section v-if="!teacherList.length">
        <h1>Não encontramos professores perto da sua região</h1>
      </section>
    </template>
  </div>
</template>

<script setup>
import TeacherCard from '@/components/TeacherCard.vue';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import LocationService from '../service/LocationService';
import BaseSlideSwiper from '../components/Base/BaseSlideSwiper.vue';

const teacherList = ref([]);
const currentItem = ref(0);
const isloading = ref(true);
const locationService = new LocationService();

const route = useRoute();
const address = ref('');
const classType = ref(route.query.type);

const handlePage = (page) => {
  return (currentItem.value = page);
};

const formattedLabel = computed(() => {
  return teacherList.value.length > 1
    ? `Encontramos ${teacherList.value.length} professores na sua região`
    : 'Encontramos 1 professor na sua região';
});

const handleAddress = async (cep) => {
  try {
    const { body } = await locationService.getPostalCodeData(cep);
    const neighborhood = `${body.bairro} - ${body.localidade} ${body.uf}`;
    address.value = neighborhood;
    const response = await locationService.getPostalCodeLocation(neighborhood);
    const { body: bodyLocation } = response;

    return { lat: Number(bodyLocation.geometry.lat), lng: Number(bodyLocation.geometry.lng) };
  } catch (e) {
    console.log(e);
    return [];
  }
};

onBeforeMount(async () => {
  await handleAddress(route.query.address)
    .then(async ({ lat, lng }) => {
      teacherList.value = await locationService.getItemByRadius(
        [lat, lng],
        classType.value,
        'users'
      );
    })
    .finally(() => {
      isloading.value = false;
    });
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

  @media @smartphone {
    width: 90svw;

    h1 {
      text-align: center;
    }

    .informative {
      justify-content: center;
    }
  }
}
</style>
