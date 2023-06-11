<template>
  <section id="view-home">
    <h1>Aulas de LIBRAS gratuitas pertinho de você!</h1>

    <p>
      Procure o professor ideal para você! Basta escolher a região e o modelo de ensino de sua
      preferência.
    </p>

    <div>
      <base-input
        ref="searchRef"
        v-if="option === enumClassType.inPerson"
        v-model="searchValue"
        class="search-input"
        id="search"
        required
        placeholder="Professores próximos ao CEP"
        type="number"
        pattern="[0-9]"
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

    <div class="arrow" @click="handleScroll">
      <img src="@/assets/arrow-down.svg" />
    </div>

    <div class="section-1">
      <div>
        <img src="@/assets/point-lines-home-black.svg" />
        <h1>Sobre o projeto</h1>
        <p>
          Helpers é um site desenvolvido com um intuito simples e objetivo: conectar pessoas que
          estejam interessadas em começar a aprender Libras com pessoas que estejam disponíveis e
          interessadas em dar aulas de forma totalmente gratuita, utilizando o modelo de ensino que
          combine mais com você: presencial ou remoto... Você escolhe!
        </p>
      </div>
    </div>

    <div class="section-2">
      <div>
        <img src="@/assets/point-lines-home-blue.svg" />

        <h1>Para alunos</h1>
        <p>
          Se você está interessado em começar a aprender Libras, o Helpers pode ser a escolha ideal.
          Aqui, você pode escolher o modelo de ensino de sua preferência: remoto, presencial ou
          ambos. Assim, ao concluir seu cadastro, você pode estar procurando professores de acordo
          com a região e/ou modelo de ensino. Tudo isso de forma totalmente gratuita.
        </p>
      </div>
      <img src="@/assets/point-lines-home-blue.svg" />
      <div>
        <img src="@/assets/point-lines-home-blue.svg" />

        <h1>Para professores</h1>
        <p>
          Para professores Se você entende Libras, aqui sua ajuda é sempre bem-vinda. Cadastre-se
          como professor voluntário, escolha seu modelo de ensino de preferência, e ensine alunos
          interessados em mergulhar nos estudos de Libras. Contamos com a sua ajuda!
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
const searchRef = ref(null);
const startRef = ref(null);

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
const range = ref({
  start: new Date(),
  end: new Date()
});
const option = ref(1);

const handleScroll = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
};

const handleSearch = async () => {
  const { user } = await useIsAuthenticate();

  if (option.value) {
    if (!searchValue.value) return searchRef.value?.focus();
  } else {
    if (!range.value?.start) return startRef.value?.focus();
  }

  return router.push({
    name: user.body ? TEACHER_LIST.NAME : LOGIN.NAME,
    query: {
      address: searchValue.value,
      type: option.value,
      start: range.value.start,
      end: range.value.end
    }
  });
};
</script>

<style lang="less">
#view-home {
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  h1 {
    margin-bottom: 3.2rem;
  }

  & > p,
  div > p {
    max-width: 88rem;
    font-size: 2rem;
    margin-bottom: 4.7rem;
    text-align: justify;
    color: var(--text-primary);
  }

  & > div {
    width: 70rem;

    .search-input,
    .date-container {
      margin-bottom: 3rem;
    }

    .date-container {
      display: flex;
      flex-wrap: wrap;

      flex-direction: row;
      justify-content: space-between;
      .date-input {
        margin-right: 20px;
      }
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
      margin-bottom: 2rem;
    }
  }

  .img {
    min-width: 85.6rem;
    border-bottom: 3px solid black;
  }

  .arrow {
    cursor: pointer;
    margin: 0 auto;
    padding-top: 6.5rem;
    padding-bottom: 3.2rem;

    img {
      display: block;
      margin: 0 auto;
      width: 6rem;
      height: 3rem;
    }
  }

  .section-1 {
    background-color: var(--input-primary);
    width: 100%;
    min-height: 36.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      text-align: center;
      color: var(--text-dark);
    }

    p {
      max-width: 64.6rem;
      text-align: justify;
      color: var(--text-dark);
    }

    img {
      width: 18.7rem;
      margin: 0 auto;
      display: block;
      padding: 0.7rem;
    }
  }

  .section-2 {
    background-color: var(--text-primary);
    width: 100%;
    min-height: 45.5rem;
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    h1 {
      color: var(--input-primary);
      text-align: start;
    }

    & > img {
      display: inline;
      transform: rotate(90deg);
    }

    div {
      width: 45%;
    }

    div:first-child {
      padding-left: 10.5rem;
    }

    div:last-child {
      padding-right: 10.5rem;
      h1 {
        text-align: end;
      }

      img {
        margin-left: auto;
      }
      p {
        margin-left: auto;
      }
    }

    p {
      color: white;
      max-width: 64.6rem;
      text-align: justify;
    }

    img {
      width: 18.7rem;
      display: block;
      padding: 0.7rem;
    }
  }

  @media @smartphone {
    margin-top: 5rem;
    & > h1 {
      text-align: center;
    }
    & > p {
      width: 30rem;
    }
    & > div {
      width: 85svw;
    }

    & > .img {
      display: none;
    }

    & .arrow {
      padding-top: 1.5rem;
    }

    & .section-1 {
      p {
        width: 100%;
      }

      & > div {
        padding: 2rem;
      }
    }

    & .section-2 {
      flex-wrap: wrap;

      & > img {
        display: none;
      }

      & > div {
        width: 100svw;
        padding: 2rem !important;

        h1 {
          text-align: center !important;
        }

        img {
          margin: 0 auto !important;
        }
      }
    }

    input::placeholder {
      font-size: 1.4rem;
    }
  }
}
</style>
