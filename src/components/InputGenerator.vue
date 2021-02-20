<template>
  <div v-if="element" class="element">
    <select
      v-if="element.type === 'select'"
      v-model="element.value"
      @change="handleInput"
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
    >
    <textarea
      v-else-if="element.type === 'textarea'"
      @keyup="handleInput"
      v-model="element.value"
      :placeholder="element.placeholder"
    />
    <button
      v-else-if="element.type === 'button'"
      type="submit"
      class="button"
      v-text="element.label"
    />
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