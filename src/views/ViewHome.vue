<template>
  <section id="view-home">
    <h1>Aulas de LIBRAS gratuitas pertinho de você!</h1>

    <p>
      Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est
      a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem.
    </p>

    <div>
      <base-input
        v-model="searchValue"
        class="search-input"
        id="search"
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
import { REGISTER } from '@/consts/publicRoutes.js';

console.log(REGISTER);
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const options = [
  {
    value: 0,
    label: 'Aulas presenciais'
  },
  {
    value: 2,
    label: 'Aulas remotas'
  }
];

const searchValue = ref('');
const option = ref(0);

const handleSearch = () => {
  router.push({ name: REGISTER.NAME });
  //TODO: mandar para a tela de procura com os resultados já
};
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
