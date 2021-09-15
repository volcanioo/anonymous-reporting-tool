import isEmpty from 'lodash/isEmpty';
import culturalIssues from "./culture-issues";
import harassmentOrBias from "./harassment-bias";
import TYPES from "./TYPES";

export default {
  feedbackType: {
    id: 'feedbackType',
    type: 'select',
    value: '',
    required: true,
    options: [
      'Feedback Type',
      TYPES.GENERAL,
      TYPES.CULTURE_ISSUES,
      TYPES.HARASSMENT_OR_BIAS,
      TYPES.DIVERSITY,
    ],
    subfields: {
      ...culturalIssues,
      ...harassmentOrBias,
    },
    validate: (value) => {
      if (value === -1 || value === '') {
        return false;
      }

      return true;
    },
  },
  relationshipToCompany: {
    id: 'relationshipToCompany',
    type: 'select',
    value: '',
    options: [
      'Relationship to the company',
      'Current Employee',
      'Former Employee',
      'Other',
    ],
    subfields: {},
    validate: (value) => {
      if (value === -1 || value === '') {
        return false;
      }

      return true;
    },
  },
  whichCityDidThisHappen: {
    id: 'whichCityDidThisHappen',
    type: 'input',
    required: true,
    value: '',
    placeholder: 'Which city did this happen in?',
    subfields: {},
    validate: (value) => {
      if (isEmpty(value)) {
        return false;
      }

      return true;
    },
  },
  whichDepartmentDidThisHappen: {
    id: 'whichDepartmentDidThisHappen',
    type: 'input',
    value: '',
    placeholder: 'Which department did this happen in?',
    subfields: {},
    validate: (value) => {
      if (isEmpty(value)) {
        return false;
      }

      return true;
    },
  },
  message: {
    id: 'message',
    type: 'textarea',
    required: true,
    value: '',
    placeholder: 'Detailed Message',
    subfields: {},
    validate: (value) => {
      if (isEmpty(value)) {
        return false;
      }

      return true;
    },
  },
};
