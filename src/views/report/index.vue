<template>
  <div class="report-page">
    <div v-if="!selectedCompany">
      <h1>Select your company.</h1>
      <div class="container">
        <company-select
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
        <button
          :disabled="!isFormValid"
          class="button"
          @click="goLastStep"
        >Go Last Step</button>
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
          <div class="checkbox checkbox--signal">
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
/*
 * !TODO(1): The form should be resetted once the user update the FeedbackType. (to avoid some bugs)
 * !TODO(2): Required messages shouldn't be visible at the first load
 */
import InputGenerator from '@/components/InputGenerator.vue';
import CompanySelect from '@/components/CompanySelect/index.vue';
import formElements from './form/index';
import API from '../../api';
import { firebase } from '../../firebase';

export default {
  name: 'Report',
  components: {
    InputGenerator,
    CompanySelect,
  },
  data() {
    return {
      loading: false,
      formElements,
      selectedCompany: null,
      enteredData: [],
      conditionsAccepted: false,
      passcode: null,
    };
  },
  computed: {
    isFormValid() {
      const hasFormElementsValid = Object.values(this.formElements).map((field) => {
        if (field.subfields) {
          Object.values(field.subfields).forEach((subfield) => {
            if (!subfield.validate(subfield.value)) {
              return false;
            }
          });
        }

        return field.validate(field.value);
      });

      return hasFormElementsValid.every((condition) => condition === true);
    },
  },
  methods: {
    generatePasscode() {
      const d = new Date();
      const random = Date.now().toString();
      this.passcode = `${this.selectedCompany.companyName.toString().charAt(0)}${random.substring(8, random.length)}-${d.getHours()}:${d.getUTCMinutes()}`; 
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
      }, 100);
    },
    finishCaseCreation() {
      this.loading = true;
      const payload = {
        ...this.enteredData,
        passcode: this.passcode,
        company: this.selectedCompany,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        status: true,
      };
      API.cases.post(payload)
        .then((doc) => {
          localStorage.setItem('caseId', doc.id);
          setTimeout(() => {
            this.$router.push({
              name: 'CaseDetail',
            })
          }, 400)
          this.loading = false;
        })
        .catch((error) => {
          console.warn(error);
          this.loading = false;
        });
    },
  },
};
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

</style>