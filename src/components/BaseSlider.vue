<template>
  <div class="slider">

    <span
      class="slider__title"
    >
      <b>Anonymously</b> <span ref="sentence" style="white-space:pre;"></span> to your company!
    </span>
    <p
      class="slider__description"
    >
      This app allows you to send feedback, report harassment/bias, or ask questions anonymously to your company.
    </p>
    <button
      class="button slider__button"
      @click="goReportPage()"
    >
      Report Issue
    </button>
  </div>
</template>

<script>
import Typed from "typed.js";

export default {
  name: "BaseSlider",
  data() {
    return {
      sentences: ["send feedback",
                  "report harassment",
                  "report bias",
                  "report bullying",
                  "report culture issues"],
      sentence: '',
      typed: {},
      options: {}
    }
  },
  mounted(){
    this.options = {
      strings: this.sentences,
      typeSpeed: 20,
      backSpeed: 0,
      loop: true,
      showCursor: false,
      backDelay: 3000,
    }

    this.typed = new Typed(this.$refs.sentence, this.options);
  },
  methods:{
    addSentence(){
      this.sentences.push(this.sentence);
      this.sentence='';
    },
    goReportPage() {
      this.$router.push({name: 'Report'})
    }
  },
  watch:{
    sentences(newValue){
      this.typed.destroy();
      this.typed = new Typed(this.$refs.sentence, this.options);
    }
  }
}
</script>

<style lang="scss" scoped>
$element_offset: 75px;

.slider {
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

.slider__description,
.slider__button {
  margin: 0 auto 0 auto;
  max-width: 992px;
  width: fit-content;
  padding: 0 64px;
}

.slider__description {
  font-size: 20px;
  line-height: 32px;
  font-weight: 400;
  margin: 20px auto 40px auto;
}


@media (max-width: 992px) {
  .slider__title {
    display: flex;
    flex-direction: column;
    font-size: 26px;
    line-height: 32px;

    span {
      min-height: 32px;
    }
  }
  .slider__description {
    font-size: 16px;
    line-height: 24px;
  }

  .slider__button {
    margin-bottom: 24px;
  }
}
</style>
