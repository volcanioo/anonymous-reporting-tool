<template>
  <div class="case-detail">
    <div class="container">
      <h1>Case {{ details.passcode }}</h1>
      <div class="content">
        <p class="content__object">
          <b>Category</b> {{ details.feedbackType }}
        </p>
        <p class="content__object">
          <b>Message</b> {{ details.message }}
        </p>
        <p
          class="content__object content__object--half"
          v-for="detail in Object.keys(details)"
          :key="detail.id"
        >
          <b>{{ camelCaseToNormal(detail) }}</b> {{ details[detail] }}
        </p>
      </div>
      <div>
        test
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import API from '../api';

export default {
  name: 'CaseDetail',
  components: {
    BaseHeader
  },
  computed: {
    details() {
      return this.$store.getters.getReport; 
    }
  },
  methods: {
    camelCaseToNormal(data) {
      return data.replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding-top: 42px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  h1 {
    flex: 0 0 100%;
  }

  > div {
    flex: 0 0 48%;
    margin: 0 2% 0 0%;
    background-color: white;
  }
}

.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.content__object {
  border: 1px solid var(--light-gray);
  margin: 0;
  padding: 12px 20px;
  font-size: 16px;
  max-width: 100%;
  flex: 0 0 100%;
  box-sizing: border-box;

  b {
    display: block;
    font-weight: 500;
    opacity: .6;
    font-size: 14px;
  }
}

.content__object--half {
  max-width: 50%;
  flex: 0 0 50%;
}
</style>
