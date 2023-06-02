<template>
  <section id="teacher-details">
    <div class="head">
      <div class="image-container">
        <img src="https://avatars.githubusercontent.com/u/60666522?v=4" alt="" />
        <div>
          <h2>Prof.º {{ userData.name }}</h2>
          <span>{{ age }}</span>
          <span> {{ availability }}</span>
        </div>
      </div>
      <base-button @click="scheduleClass" class="schedule-button">Agendar Aula</base-button>
    </div>
    <div class="content">
      <div class="first-section">
        <span>Sobre o professor</span>
        <p>
          {{ userData.resume }}
        </p>
      </div>
      <div class="second-section">
        <div>
          <span>Localização</span>
          <p>Nome do bairro - Cidade, Estado</p>
        </div>
        <div>
          <span>Plataforma</span>
          <p>{{ userData.platform }}</p>
        </div>
        <div>
          <span>Contato</span>
          <p>{{ contact }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeMount, reactive } from 'vue';
import { SCHEDULE_CLASS } from '@/consts/privateRoutes';
import { useRoute, useRouter } from 'vue-router';
import UserService from '@/service/UserService';

const availabilityEnum = {
  0: 'Disponivel para aulas remotas',
  1: 'Disponivel para aulas presenciais',
  3: 'Disponível para aulas presenciais e remotas'
};

const route = useRoute();
const router = useRouter();
const userData = reactive({});

const age = computed(() => {
  const birthDate = new Date(userData.birthDay).getFullYear();
  const currentYear = new Date().getFullYear();
  return `${currentYear - birthDate} anos `;
});

const availability = computed(() => {
  return availabilityEnum[userData.classType];
});

const contact = computed(() => {
  return String(userData.contact).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
});

const scheduleClass = () => {
  return router.push({ name: SCHEDULE_CLASS.NAME, params: { id: userData.id } });
};

onBeforeMount(async () => {
  const userService = new UserService();
  const { id } = route.params;
  const { body } = await userService.get(id);
  Object.assign(userData, body);
});
</script>

<style lang="less" scoped>
#teacher-details {
  width: 100%;
  .head {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;

    margin-top: 3.4rem;
    .image-container {
      display: flex;
      align-items: center;
      flex-direction: row;

      img {
        width: 15.1rem;
        height: 15.1rem;
        outline: 0.4rem solid var(--text-primary);
        border-radius: 1.6rem;
        margin-right: 1.5rem;
      }

      div {
        h2 {
          color: var(--text-dark);
        }

        span {
          font-size: 1.6rem;
          margin-bottom: 1.6rem;
          display: block;
        }
      }
    }

    .schedule-button {
      margin: auto 0;
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 4.8rem;

    & > div {
      width: 45%;
    }

    span {
      width: 12.4rem;
      text-align: center;
      background-color: var(--text-primary);
      color: white;
      font-size: 1.4rem;
      display: inline-block;
      margin-bottom: 1.6rem;
      padding: 0.6rem;
      margin-top: 2.7rem;
    }
    p {
      font-size: 1.6rem;
    }
  }
}
</style>
