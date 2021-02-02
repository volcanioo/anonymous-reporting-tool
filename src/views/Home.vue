<template>
  <div class="send-feedback">
    <base-header></base-header>
    <base-slider></base-slider>
    <div class="send-feedback__footer">
      <strong>{{ $t('scroll_down') }}</strong>
      <img src="@/assets/mouse.svg" alt="Scroll down to learn how it works">
    </div>
  </div>
</template>

<script>
// import { collections } from '../firebase/index';
import BaseHeader from '../components/BaseHeader.vue';
import BaseSlider from '../components/BaseSlider.vue';

export default {
  name: 'Homepage',
  components: {
    BaseHeader,
    BaseSlider,
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
  background: var(--primary-color) url('../assets/face-bg-left.svg') no-repeat left center / contain;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &::after {
    content: "";
    background: url('../assets/face-bg-right.svg') no-repeat right center / contain;
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 0;
  }
}

.send-feedback__footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 12px;
  }

  img {
    margin-bottom: 60px;
  }
}

</style>
