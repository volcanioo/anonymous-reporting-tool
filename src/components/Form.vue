<template>
    <form
      class="form"
      @submit.prevent="submitAction"
    >
      <input-generator
        v-for="element in elements" :key="element.id"
        :element="element"
        :data-field="element.id"
        v-model="element.value"
        :class="`form__element form__element--${element.type}`"
      />
      <input-generator
        :class="'form__element--submit'"
        :element="submitButton"
      />
    </form>
</template>

<script>
import InputGenerator from '@/components/InputGenerator.vue';
export default {
  name: 'Form',
  components: {
    InputGenerator
  },
  props: {
    elements: {
      type: Array,
      required: true
    },
    submitButton: {
      type: Object,
    },
    submitAction: {
      type: Function,
    },
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  align-items: center;
  padding-top: 30px;

  &__element {
    &--submit {
      margin-top: 1.5em;
    }
  }

  input {
    width: 100%;
    height: 68px;
    border: none;
    background: #F6F7F9;
    font-size: 20px;
    font-family: inherit;
    font-weight: 500;
    color: #808080;
    margin-bottom: 20px;
    padding-left: 20px;
  }

  label {
    font-size: 16px;
    margin-bottom: 4px;
    width: 100%;
    display: block;
  }

  > div {
    width: 100%;
  }

  &__link {
    margin-top: 32px;
    font-size: 16px;
    color: var(--dark-black);
    display: block;
    text-align: left;
    font-weight: 600;
    color: var(--dark-black);
    text-decoration: underline;
  }
}
</style>