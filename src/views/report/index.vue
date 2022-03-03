<template>
  <div class="report-page">
    <div v-if="!selectedCompany">
      <h1>Select your representative.</h1>
      <div class="container">
        <company-select
          @company-selected="setCompany"
        />
      </div>
    </div>
    <div v-else>
      <h1>Enter report details.</h1>
      <div class="container report-page__form" ref="form">
        <!-- <div class="company-card">
          <b>TO: </b> {{ selectedCompany.name }}
        </div> -->
        <div
          v-for="element in formFields"
          class="report-page__element"
          :class="{ 'report-page__element--shake-invalid-elements': shakeInvalidElements }"
          :key="element.id"
        >
          <input-generator
            ref="inputField"
            :element="element"
            :data-field="element.id"
            :showErrorMessage="showErrorMessage"
            @onUpdate="onInputChange"
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
                ref="inputField"
                v-if="subfield.parentField === element.value"
                :element="subfield"
                :data-field="subfield.id"
                :showErrorMessage="showErrorMessage"
                @onUpdate="onInputChange"
                v-model="subfield.value"
              />
            </div>
          </div>
        </div>
        <button
          class="button"
          @click="goLastStep"
        >Send Report</button>
        <div class="alternative-exit">
          <button @click="goBack()">Cancel</button>
        </div>
      </div>
      <warning
        v-if="showWarningMessage"
        :selected-company="selectedCompany"
        :loading="loading"
        :onFinish="finishCaseCreation"
      />
    </div>
  </div>
</template>

<script>
/*
 * !TODO(1): The form should be resetted once the user update the FeedbackType. (to avoid some bugs)
 */
import mapValues from 'lodash/mapValues';
import InputGenerator from '@/components/InputGenerator.vue';
import CompanySelect from '@/components/CompanySelect/index.vue';
import FORM_FIELDS from './codables/index';
import Warning from './components/Warning.vue';
import API from '../../api';
import { firebase } from '../../firebase';

export default {
  name: 'Report',
  components: {
    InputGenerator,
    CompanySelect,
    Warning,
  },
  data() {
    return {
      showWarningMessage: false,
      loading: false,
      formFields: {
        ...FORM_FIELDS,
      },
      showErrorMessage: false,
      shakeInvalidElements: false,
      selectedCompany: {
        name: "Persons of Trust",
        user_id: "aOugkJisMMNuaeTxRkNXggKfQDG3",
        objectID: "3308604001",
      },
      enteredData: [],
      passcode: null,
    };
  },
  computed: {
    isFormValid() {
      const hasFormElementsValid = Object.values(this.formFields).map((field) => {
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
    setCompany(e) {
      this.selectedCompany = e;
    },
    goBack() {
      this.resetForm();
      window.scrollTo(0, 0);
      this.$router.push({ name: 'Home' });
    },
    indicateErrorMessages() {
      this.shakeInvalidElements = true;
      let firstInvalidField = this.$refs.inputField
        .map((element) => element.$el.classList)
        .findIndex((element) => element.contains('element--error'));

      firstInvalidField = (firstInvalidField === -1) ? 0 : firstInvalidField;

      window.scrollTo(0, this.$refs.inputField[firstInvalidField].$el.offsetTop);

      setTimeout(() => {
        this.shakeInvalidElements = false;
      }, 750);
    },
    goLastStep() {
      if (!this.isFormValid) {
        this.showErrorMessage = true;
        this.indicateErrorMessages();
        return;
      }

      /*
       * The reason of usage `allEnteredFields`
       *
       * `formElements` variable stores every value & fields data at the same time
       * At the post action, we need to get only filled field values as an object to post it to BE
       * For this reason, we are not mapping `formElements` directly,
       * Instead, we fill `allEnteredFields` with filled fields' value to have one seperate object
       */
      const allEnteredFields = this.$refs.form.querySelectorAll('.element');
      allEnteredFields.forEach((element) => {
        this.enteredData[element.getAttribute('data-field')] = element.getAttribute('value');
      });
      this.showWarningMessage = true;

      setTimeout(() => window.scrollTo(0, window.innerHeight), 100);
    },
    resetForm() {
      this.enteredData = [];
      const formFieldsWithEmptyValue = mapValues(this.formFields, (field) => {
        // Avoid resetting feedbackType
        if (field.id === 'feedbackType') {
          return {
            ...field,
          };
        }

        return {
          ...field,
          value: '',
          subfields: {
            ...mapValues(field.subfields, (subfield) => {
              return {
                ...subfield,
                value: '',
              };
            }),
          },
        };
      });
      this.formFields = formFieldsWithEmptyValue;
    },
    onInputChange(input) {
      if (input.id === 'feedbackType') {
        this.resetForm();
      }
    },
    finishCaseCreation(passcode) {
      this.loading = true;
      const payload = {
        ...this.enteredData,
        company: this.selectedCompany,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        status: true,
        passcode,
      };
      API.cases.post(payload)
        .then((doc) => {
          localStorage.setItem('caseId', doc.id);
          setTimeout(() => this.$router.push({ name: 'CaseDetail' }), 400);
          this.loading = false;
        })
        .catch((error) => {
          console.warn(error);
          this.loading = false;
        })
        .finally(() => this.resetForm());
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

.report-page__element--shake-invalid-elements {
  ::v-deep .element--error > *,
  ::v-deep .element--error > *,
  ::v-deep .element--error > * {
    animation-name: animate;
    animation-duration: 0.4s;
    transition-timing-function: ease-in;
  }
}

@keyframes animate {
  0% {
    box-shadow: 0 0 0px 1px rgba(255, 0, 0, 1);
    -webkit-box-shadow: 0 0 0px 1px rgba(255, 0, 0, 1);
  }
  50% {
    box-shadow: 0 0 0px 6px rgba(255, 0, 0, .3);
    -webkit-box-shadow: 0 0 0px 6px rgba(255, 0, 0, .3);
  }
  100% {
    box-shadow: 0 0 0px 1px rgba(255, 0, 0, 1);
    -webkit-box-shadow: 0 0 0px 1px rgba(255, 0, 0, 1);
  }
}

.company-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--light-gray);
  margin-bottom: 25px;
  padding: 8px 20px;

  b {
    margin-right: 8px;
  }
}

.alternative-exit {
  display: flex;
  flex-direction: column;
  padding-top: 32px;

  span {
    padding-bottom: 8px;
    font-size: 18px;
    color: rgba(26, 26, 26, 0.3);
    font-weight: 600;
  }
  button {
    width: 130px;
    height: 40px;
    cursor: pointer;
    border-radius: 100px;
    border: none;
    margin: 0 auto;
    background: var(--secondary-color);
    color: white;
    font-weight: 500;
    font-size: 14px;
    transition:
      background cubic-bezier(0.075, 0.82, 0.165, 1) .4s,
      color cubic-bezier(0.075, 0.82, 0.165, 1) .4s;

    &:hover {
      background: var(--dark-black);
      color: white;
    }
  }
}

@media (max-width: 992px) {
  .report-page {
    h1 {
      font-size: 24px;

    }
  }
  .report-page__form,
  .company-selector {
    padding: 0 16px;
  }
}
</style>
