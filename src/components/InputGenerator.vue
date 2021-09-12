<template>
  <div
    v-if="element"
    class="element"
    :class="{
      'element--error': !isInputInvalid,
    }"
  >
    <select
      v-if="element.type === 'select'"
      v-model="element.value"
      @change="handleInput"
      :required="element.required"
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
      :required="element.required"
    >
    <textarea
      v-else-if="element.type === 'textarea'"
      @keyup="handleInput"
      v-model="element.value"
      :placeholder="element.placeholder"
      :required="element.required"
    />
    <button
      v-else-if="element.type === 'button'"
      type="submit"
      class="button"
      v-text="element.label"
    />
    <span
      v-if="!isInputInvalid"
      class="element--message"
    >
      Required
    </span>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isRequired() {
      return this.element.required;
    },
    isInputInvalid() {
      return this.element?.validate(this.element.value);
    },
  },
  methods: {
    handleInput() {
      this.$emit('input', this.element.value);
      this.$emit('validation');
    },
  },
};
</script>
<style lang="scss" scoped>
.element {
  position: relative;
}

.element--error {
  ::v-deep > * {
    outline: 1px solid var(--red);
  }
}

.element--message {
  font-weight: 600;
  color: white;
  position: absolute;
  font-size: 12px;
  right: 0;
  bottom: 21px;
  background: var(--red);
  padding: 0 6px;
}
</style>
