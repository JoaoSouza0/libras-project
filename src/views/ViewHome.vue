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
        :valid="true"
        id="search"
        placeholder="Encontrar professores próximos a..."
      >
        <template #icon>
            <img src="@/assets/global-search-home.svg" alt="" srcset="" />
        </template>
      </base-input>

      <radio-input class="radio-input" v-model="option" :options="options" />
    </div>

    <div class="img">
      <img src="@/assets/people-home.svg" alt="jovens fazendo sinais" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const options = [
  {
    value: 0,
    label: 'Sou estudantes'
  },
  {
    value: 2,
    label: 'Sou professor'
  }
]

const searchValue = ref('')
const option = ref(0)
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
    margin-bottom: 8.7rem;
    text-align: center;
    color: var(--text-primary);
  }

  & > div {
    width: 70rem;

    .search-input {
      margin-bottom: 1.7rem;
    }

    .icon {
      background-color: var(--text-primary);
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
