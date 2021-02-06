<template>
  <div class="slider">
    <span 
      class="slider__title"
      v-html="$t('slider_title')"
    />
    <p 
      class="slider__description"
      v-html="$t('slider_description')"
    />
    <button
      class="button"
      v-html="$t('send_feedback')"
    />
  </div>
</template>

<script>
export default {
  name: "BaseSlider",
}
</script>

<style lang="scss" scoped>
$element_offset: 75px;

.slider {
  width: 768px;
  margin: 0 auto;
  text-align: center;
}

.slider__title {
  font-size: 36px;
  line-height: 44px;
  font-weight: 500;

  strong {
    font-weight: 700;
  }
}

.slider__description {
  font-size: 20px;
  line-height: 32px;
  font-weight: 400;
  padding: 0 $element_offset;
  margin: 20px 0 40px 0;
}
</style>