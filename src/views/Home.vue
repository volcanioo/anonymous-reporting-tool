<template>
  <div class="row">
    <div class="homepage">
      <base-header></base-header>
      <base-slider></base-slider>
      <div class="homepage__footer">
        <strong v-text="$t('scroll_down')" />
        <img
          src="@/assets/mouse.svg"
          :alt="$t('scroll_down')"
        />
      </div>
    </div>
    <div class="content">
      <div class="container">
          <div class="wrapper">
              <strong>{{ $t('HOMEPAGE.HOW_DOES_IT_WORK.TITLE') }}</strong>
              <p>{{ $t('HOMEPAGE.HOW_DOES_IT_WORK.DESC') }}</p>
          </div>
          <figure>
              <img
                src="@/assets/1.svg"
                :alt="$t('HOMEPAGE.HOW_DOES_IT_WORK.TITLE')"
              />
          </figure>
      </div>

      <div class="container">
          <figure>
              <img src="@/assets/2.svg" alt="image about how does it work?">
          </figure>
          <div class="wrapper">
              <strong>{{ $t('HOMEPAGE.HOW_ANON_IT_IS.TITLE') }}</strong>
              <p>{{ $t('HOMEPAGE.HOW_ANON_IT_IS.DESC') }}</p>
          </div>
      </div>
    </div>
    <base-footer></base-footer>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import BaseSlider from '../components/BaseSlider.vue';
import BaseFooter from '../components/BaseFooter.vue';

export default {
  name: 'Homepage',
  components: {
    BaseHeader,
    BaseSlider,
    BaseFooter,
  },
};
</script>

<style lang="scss" scoped>
.homepage {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.homepage__footer {
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

.content {
  background: #1A1A1A;
  display: flex;
  flex-direction: column;

  figure {
    width: 40%;
    margin: 0;
    padding: 0 60px;

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
}

.container {
  display: flex;
  flex-direction: row;
  margin: 60px auto;
  width: 1140px;
}

.wrapper {
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-family: Poppins;
  font-style: normal;

  strong {
    font-weight: bold;
    font-size: 32px;
    line-height: 48px;
    color: #F2F2F2;
    margin-bottom: 20px;
  }

  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #BFBFBF;
  }
}

</style>
