<template>
  <div class="report-page">
    <h1>Create your report.</h1>
    <form action="#" class="report-page__form">
      <div
        v-for="element in formElements"
        class="report-page__element"
        :key="element.id"
      >
        <input-generator
          :element="element"
          v-model="element.value"
        />
        <div
          v-if="element.subfields"
          class="report-page__element"
        >
          <div
            v-for="subfield in element.subfields"
            :key="subfield.id"
            class="report-page__element"
          >
            <input-generator
              v-if="subfield.parentField === element.value"
              :element="subfield"
              v-model="subfield.value"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import formElements from './form/index';
import InputGenerator from '@/components/InputGenerator.vue';

export default {
  name: "Report",
  components: {
    InputGenerator,
  },
  data() {
    return {
      formElements,
    }
  },
}
</script>

<style lang="scss" scoped>
.report-page {
  text-align: center;
  padding-top: 40px;
}

.report-page__form {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}

.report-page__element {
  display: flex;
  flex-direction: column;
}
</style>