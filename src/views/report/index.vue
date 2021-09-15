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
      <h1>Enter report details.</h1>
      <div class="container report-page__form" ref="form">
        <div class="company-card">
          <span>TO:</span>
          <figure>
            <img
              :src="selectedCompanyImage"
              :alt="selectedCompany.companyName"
            >
          </figure>
          <strong> {{ selectedCompany.companyName }} </strong>
        </div>
        <div
          v-for="element in formFields"
          class="report-page__element"
          :key="element.id"
        >
          <input-generator
            :element="element"
            :data-field="element.id"
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
                v-if="subfield.parentField === element.value"
                :element="subfield"
                :data-field="subfield.id"
                @onUpdate="onInputChange"
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
 * !TODO(2): Required messages shouldn't be visible at the first load
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
      formFields: FORM_FIELDS,
      selectedCompany: null,
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
    selectedCompanyImage() {
      return (this.selectedCompany.companyPhotoUrl) ? this.selectedCompany.companyPhotoUrl : require('@/assets/user.svg');
    },
  },
  methods: {
    setCompany(e) {
      this.selectedCompany = e;
    },
    goLastStep() {
      if (!this.isFormValid) return;

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
</style>
