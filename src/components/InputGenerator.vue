<template>
  <div v-if="element" class="element">
    <select
      v-if="element.type === 'select'"
      v-model="element.value"
      @change="handleInput"
      :required="Boolean(element.required)"
      :name="element.id"
      :id="element.id"
    >
      <option
        v-for="(option, index) in element.options"
        :key="option"
        v-text="option"
        :value="index !== 0 ? option : -1"
      />
    </select>
    <input
      v-else-if="element.type === 'input'"
      type="text"
      @keyup="handleInput"
      v-model="element.value"
      :placeholder="element.placeholder"
      :required="Boolean(element.required)"
      :name="element.id"
      :id="element.id"
    >
    <textarea
      v-else-if="element.type === 'textarea'"
      @keyup="handleInput"
      v-model="element.value"
      :placeholder="element.placeholder"
      :required="Boolean(element.required)"
      :name="element.id"
      :id="element.id"
    />
    <button
      v-else-if="element.type === 'button'"
      type="submit"
      class="button"
      v-text="element.label"
    />
    <div
      class="element--file"
      v-else-if="element.type === 'file'"
    >
      <img v-if="element.value" :src="element.value" :alt="element.placeholder">
      <input
        type="file"
        @keyup="handleInput"
        :placeholder="element.placeholder"
        :required="Boolean(element.required)"
        :name="element.id"
        :id="element.id"
      />
    </div> 
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      default: {},
    },
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.element.value)
    }
  }
}
</script>

<style lang="scss">
  .element {
    &--file {
      display: flex;
      align-items: center;

      img {
        flex: 1;
      }

      input {
        flex: 4;
        margin-left: 1em;
      }
    }
  }
</style>