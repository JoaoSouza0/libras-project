<template>
  <base-modal>
    <div id="procedure-container">
      <nav>
        <a @click="$emit('close')">
          <img src="@/assets/close-icon.svg" alt="close icon" srcset="" />
        </a>
      </nav>
      <procedure-form
        :procedure="procedure"
        :observation="observation"
        @submit="(v) => $emit('submit', v)"
      >
        <slot />
      </procedure-form>
    </div>
  </base-modal>
</template>

<script setup>
import ProcedureForm from '@/layouts/Forms/procedureForm.vue';
const emits = defineEmits(['submit', 'close']);
const props = defineProps({
  procedure: {
    default: 1,
    type: Number
  },
  observation: {
    default: null,
    type: [String, null]
  }
});
</script>

<style lang="less">
#procedure-container {
  border-radius: 1rem;
  max-width: 45rem;
  background: white;
  margin: auto;
  align-self: center;

  nav {
    border-radius: 1rem 1rem 0 0;
    background-color: var(--text-primary);
    padding: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      width: 16px;
      height: 16px;
    }
  }

  #button {
    margin-top: 2rem;
    width: 100%;
  }
}
</style>
