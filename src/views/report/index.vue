<template>
  <div class="report-page">
    <div v-if="!selectedCompany">
      <h1>Select your company.</h1>
      <div class="container">
        <company-selector 
          @company-selected="setCompany"
        />
      </div>
    </div>
    <div v-else>
      <h1>Create your report.</h1>
      <div class="container report-page__form" ref="form">
        <div class="company-card">
          <span>TO:</span>
          <figure>
            <img 
              :src="selectedCompany.companyPhotoUrl"
              :alt="selectedCompany.companyName"
            >
          </figure>
          <strong> {{ selectedCompany.companyName }} </strong>
        </div>
        <div
          v-for="element in formElements"
          class="report-page__element"
          :key="element.id"
        >
          <input-generator
            :element="element"
            :data-field="element.id"
            v-model="element.value"
          />
          <div
            v-if="element.subfields"
            class="report-page__element"
          >
            <div
              v-for="subfield in element.subfields"
              :key="subfield.id"
              class="report-page__element"
            >
              <input-generator
                v-if="subfield.parentField === element.value"
                :element="subfield"
                :data-field="subfield.id"
                v-model="subfield.value"
              />
            </div>
          </div>
        </div>
        <button class="button" @click="goLastStep">Go Last Step</button>
      </div>
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
          <div class="report-page__checkbox">
            <input type="checkbox" v-model="conditionsAccepted">
            <span>
              I understand that if I forget or lose the passcode, I have to create my case report from the beginning as the system ensures my safety, security and anonymousness!
            </span>
          </div>
          <button
            class="button button--red"
            :disabled="!conditionsAccepted"
            :class="{
              'button--signal': conditionsAccepted,
              'button--progress': loading
            }"
            @click="finishCaseCreation"
          >Finish and Go Case Detail</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formElements from './form/index';
import InputGenerator from '@/components/InputGenerator.vue';
import CompanySelector from '@/components/CompanySelector.vue'
import API from "../../api";

export default {
  name: "Report",
  components: {
    InputGenerator,
    CompanySelector,
  },
  data() {
    return {
      loading: false,
      formElements,
      selectedCompany: null,
      enteredData: [],
      conditionsAccepted: false,
      passcode: null,
    }
  },
  methods: {
    generatePasscode() {
      this.passcode = `${this.selectedCompany.companyName.toString().charAt(0)}-${Math.floor(Math.random()*90000) + 10000}`; 
    },
    setCompany(e) {
      this.selectedCompany = e;
    },
    copyToClipboard() {
      var copyText = this.$refs.passcode;
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
    goLastStep() {
      this.generatePasscode();
      const allEnteredElements = this.$refs.form.querySelectorAll('.element');
      allEnteredElements.forEach(element => {
        this.enteredData[element.getAttribute('data-field')] = element.getAttribute('value');
      });
      setTimeout(() => {
        window.scrollTo(0, window.innerHeight);
      }, 100)
    },
    finishCaseCreation() {
      this.loading = true;
      const payload = {
        ...this.enteredData, 
        passcode: this.passcode, 
        company: this.selectedCompany, 
        created: Date.now()
      };
      API.cases.post(payload)
      .then((result) => {
        this.$router.push({
          name: 'AnonymousLogin',
        })
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        this.loading = false;
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.report-page {
  text-align: center;
  padding-top: 40px;
}

.container {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}

.report-page__wrapper {
  max-width: 640px;
  margin: 0 auto;
}

.report-page__form {
  padding-bottom: 180px;
}

.report-page__element {
  display: flex;
  flex-direction: column;
}

.company-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--light-gray);
  margin-bottom: 25px;
  padding: 8px 20px;

  figure {
    margin: 0;
    img {
      max-width: 30px;
      display: block;
      margin: 0 15px;
      border-radius: 100%;
    }
  }
}

.report-page__warning {
  width: 100%;
  background: var(--dark-black);
  box-sizing: border-box;
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
    max-width: 210px;
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

.report-page__checkbox {
  position: relative;
  margin: 25px 0;

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
  }

  input:checked + span:after {
    -webkit-mask: url('../../assets/check.svg');
    background-color: black;
    -webkit-mask-size: 80% 80%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
  }
  input:checked + span:before {
    animation: none;
    background: white;
    opacity: 1;
  }

  span {
    padding-left: 35px;
    position: relative;
    display: block;

    &:after,
    &:before {
      content: "";
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, .4);
      border: 1px solid rgba(255, 255, 255, .1);
      left: 0;
      top: 6px;
      position: absolute;
    }

    &:before {
      background: transparent;
      border: 1px solid white;
      animation: signal 1.2s infinite;
    }
  }
}
@keyframes signal {
  from {
    width: 20px;
    height: 20px;
    transform: translate(0px, 0px);
    opacity: 1;
    box-shadow: inset 0 0 0 2px var(--dark-black);
  }
  to {
    width: 30px;
    height: 30px;
    box-shadow: inset 0 0 0 1px var(--dark-black);
    opacity: 0;
    transform: translate(-5px, -5px)
  }
}
</style>