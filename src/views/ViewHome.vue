<template>
  <section id="view-home">
    <h1>Aulas de LIBRAS gratuitas pertinho de você!</h1>

    <p>
      Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est
      a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem.
    </p>

    <div>
      <base-input
        ref="searchRef"
        v-model="searchValue"
        class="search-input"
        id="search"
        required
        placeholder="Encontrar professores próximos a..."
      >
        <template #icon>
          <div class="icon-wrapper" @click="handleSearch">
            <img src="@/assets/global-search-home.svg" alt="" srcset="" />
          </div>
        </template>
      </base-input>

      <radio-input class="radio-input" v-model="option" :options="options" />
    </div>

    <div class="img">
      <img src="@/assets/people-home.svg" alt="jovens fazendo sinais" />
    </div>

    <div class="section-1">
      <div>
        <h1>Sobre o projeto</h1>
        <p>
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
          est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
          lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
          feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante
          pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
          bibendum lorem.
        </p>
      </div>
    </div>

    <div class="section-2">
      <div>
        <h1>Para alunos</h1>
        <p>
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
          est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
          lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
          feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante
          pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
          bibendum lorem.
        </p>
      </div>
      <div>
        <h1>Para professores</h1>
        <p>
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
          est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
          lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
          feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante
          pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
          bibendum lorem.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { LOGIN } from '@/consts/publicRoutes.js';
import { TEACHER_LIST } from '@/consts/privateRoutes.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { enumClassType } from '@/consts/enums.js';
import { useIsAuthenticate } from '@/composables/user';
import { useUserStore } from '@/stores/UserStore';

const router = useRouter();
const userStore = useUserStore();
const searchRef = ref(null);

const options = [
  {
    value: enumClassType.inPerson,
    label: 'Aulas presenciais'
  },
  {
    value: enumClassType.remote,
    label: 'Aulas remotas'
  }
];

const searchValue = ref('');
const option = ref(0);

const handleSearch = async () => {
  const { user } = await useIsAuthenticate();

  if (!searchValue.value) {
    return searchRef.value.focus();
  }

  return router.push({
    name: user.body ? TEACHER_LIST.NAME : LOGIN.NAME,
    query: { address: searchValue.value, type: option.value }
  });
};

</script>

<style lang="less" scoped>
#view-home {
  margin-top: 8rem;
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
      margin-bottom: 3rem;
    }

    .icon-wrapper {
      height: 102%;
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
