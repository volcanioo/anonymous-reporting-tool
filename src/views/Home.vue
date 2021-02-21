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
              <strong>How does it work?</strong>
              <p>The tool doesn't require any personal data (e.g. name, surname, e-mail, phone number) to report a harassment/bias, send a feedback or ask a question. Instead, the tool requires only case related details. It automatically creates an anonymous username and password, and assign it to the case. Then, it shares these credentials with the user before completing the case report process. Afterward, the user can login into the app anonymously to follow the created case's further updates.</p>
          </div>
          <figure>
              <img src="@/assets/1.svg" alt="image about how does it work?">
          </figure>
      </div>

      <div class="container">
          <figure>
              <img src="@/assets/2.svg" alt="image about how does it work?">
          </figure>
          <div class="wrapper">
              <strong>How Anonymous it is?</strong>
              <p>The tool doesn't need any personal data. Alternatively, it generates a unique username and password before completing the case report and displays it to the user. The user must protect these anonymous credentials as it will be needed to login into the app to be able for the user to follow their case's further updates. After receiving and saving the anonymous credentials, the app encrypts and stores them in the database. Even a developer will not be able to see the credentials at any stage of the case report process.</p>
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
  box-sizing: border-box;
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
