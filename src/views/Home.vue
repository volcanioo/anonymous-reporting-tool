<template>
  <div class="general-container">
    <base-header></base-header>
    <base-slider></base-slider>
    <div class="general-container__footer">
      <strong v-text="$t('scroll_down')" />
      <img
        src="@/assets/mouse.svg"
        :alt="$t('scroll_down')"
      />
    </div>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import BaseSlider from '../components/BaseSlider.vue';

export default {
  name: 'Homepage',
  components: {
    BaseHeader,
    BaseSlider,
  },
};
</script>

<style lang="scss">
.general-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.general-container__footer {
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
