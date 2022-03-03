<template>
    <form
      class="form"
      @submit.prevent="submit"
    >
      <input-generator
        v-for="element in elements"
        :key="element.id"
        :element="element"
        :data-field="element.id"
        :required="element.required"
        v-model="element.value"
        :class="`form__element form__element--${element.type}`"
      />
      <button class="button">{{ submitLabel }}</button>
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
    submitAction: {
      type: Function,
    },
    submitLabel: {
      type: String,
    }
  },
  methods: {
    submit(e) {
      const isValid = this.elements.reduce((valid, element) => {
        if (!element.validate) return valid && true;

        return valid && element.validate(element.value)
      }, true);

      if (isValid) this.submitAction(e);
    }
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

@media (max-width: 992px) {
  .form {
    width: 100%;
    padding: 0 16px;
  }
}
</style>
