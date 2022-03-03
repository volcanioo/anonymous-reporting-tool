<template>
  <div
    class="report-page__warning"
    v-if="passcode"
  >
    <img src="@/assets/warning.svg" alt="warning">
    <div class="report-page__content">
      <strong>Save Anonymous Login Info</strong>
      <p><b>Be careful</b>! You are creating this case with an anonymous profile. At the bottom, you see a passcode. You will use these passcode to login into the app, which allows you to follow your case's further updates.</p>
      <div class="report-page__passcode">
        <span>PASSCODE</span> <input ref="passcode" :value="passcode" readonly>
        <button @click="copyToClipboard">COPY</button>
      </div>
      <div class="checkbox checkbox--signal">
        <input type="checkbox" v-model="isConditionsAccepted">
        <span>
          I understand that if I forget or lose the passcode, I have to create my case report from the beginning as the system ensures my safety, security and anonymousness!
        </span>
      </div>
      <button
        class="button button--red"
        :disabled="!isConditionsAccepted"
        :class="{
          'button--signal': isConditionsAccepted,
          'button--progress': loading
        }"
        @click="finishCaseCreation"
      >Finish and Go Case Detail</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConditionsAccepted: false,
    };
  },
  computed: {
    passcode() {
      const d = new Date();
      const random = Date.now().toString();
      return `${this.selectedCompany.name.toString().charAt(0)}${random.substring(8, random.length)}-${d.getHours()}:${d.getUTCMinutes()}`;
    },
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    selectedCompany: {
      type: Object,
      required: true,
    },
    onFinish: {
      type: Function,
      required: true,
    },
  },
  methods: {
    copyToClipboard() {
      const copyText = this.$refs.passcode;
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand('copy');
    },
    finishCaseCreation() {
      this.onFinish(this.passcode);
    },
  },
};
</script>

<style lang="scss" scoped>

.report-page__warning {
  width: 100%;
  background: var(--dark-black);
  flex-direction: row;
  display: flex;
  align-items: flex-start;
  padding: 50px 20%;
  padding-bottom: 200px;
}


.report-page__content {
  text-align: left;
  color: white;
  padding-left: 50px;

  strong {
    font-family: inherit;
    font-size: 36px;
    line-height: 44px;
    font-weight: 500;
  }

  p {
    font-size: 16px;
  }
}

.report-page__passcode {
  background: white;
  padding: 12px 0px 12px 20px;
  color: black;
  width: fit-content;
  font-size: 35px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;

  span {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-right: 8px;
  }

  input {
    padding: 5px 20px 5px 20px;
    background: #ececec;
    text-align: left;
    color: red;
    max-width: max-content;
    margin: 0;
    font-size: 30px;
    max-width: 260px;
  }

  button, span {
    font-size: 18px;
    font-weight: 600;
    outline: none;
    opacity: .7;
  }

  button {
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0 15px;
  }
}

@media (max-width: 992px) {
  .report-page__warning {
    padding: 16px;
    flex-direction: column;
    margin-top: 40px;

    & > img {
      margin: 20px auto;
    }

    .report-page__content {
      padding: 0;
    }

    strong {
      font-size: 24px;
    }

    p {
      margin-top: 0;
      margin-bottom: 25px;
    }
  }
}
</style>
