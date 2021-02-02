<template>
  <div class="slider">
    <span class="slider__title">
      <strong>Anonymously</strong> send feedback to us.
    </span>
    <p class="slider__description">
      This tool allows the employees to report harassment/discrimination anonymously to the company.
    </p>
    <button class="slider__button">
      Send Feedback
    </button>
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
}

.slider__title strong {
  font-weight: 700;
}

.slider__description {
  font-size: 20px;
  line-height: 32px;
  font-weight: 400;
  padding: 0 $element_offset;
  margin: 20px 0 40px 0;
}

.slider__button {
  width: calc(100% - #{$element_offset});
  background: var(--dark-black);
  margin: 0 auto;
  color: white;
  border: none;
  height: 68px;
  font-size: 20px;
  line-height: 28px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background: var(--secondary-color);
    color: black;
    transition: background .4s cubic-bezier(0.25, 1, 0.5, 1) .1s, box-shadow .2s cubic-bezier(0.25, 1, 0.5, 1) .5s;
    box-shadow: 0px 0px 0px 6px var(--dark-black);
  }
}
</style>