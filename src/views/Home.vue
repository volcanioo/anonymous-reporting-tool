<template>
  <div class="send-feedback">
    <base-header></base-header>
  </div>
</template>

<script>
// import { collections } from '../firebase/index';
import BaseHeader from '../components/BaseHeader.vue';

export default {
  name: 'Homepage',
  components: {
    BaseHeader,
  },
  created() {
    // collections.unknown.doc().set({
    //   username: 'mvlkn',
    //   password: 'dvc',
    // });
  },
};
</script>

<style lang="scss">
.send-feedback {
  background: var(--primary-color);
  width: 100%;
  height: 100vh;
}
</style>
