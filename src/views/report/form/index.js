import { culturalIssues } from "./culture-issues";
import { harassmentOrBias } from "./harassment-bias";
import TYPES from "./TYPES";

export default {
  feedbackType: {
    id: 'feedbackType',
    type: 'select',
    value: '-1',
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
    }
  },
  relationshipToCompany: {
    id: 'relationshipToCompany',
    type: 'select',
    value: '-1',
    options: [
      'Relationship to the company',
      'Current Employee',
      'Former Employee',
      'Other',
    ],
    subfields: {}
  },
  whichCityDidThisHappen: {
    id: 'whichCityDidThisHappen',
    type: 'input',
    value: '',
    placeholder: 'Which city did this happen in?',
    subfields: {}
  },
  whichDepartmentDidThisHappen: {
    id: 'whichDepartmentDidThisHappen',
    type: 'input',
    value: '',
    placeholder: 'Which department did this happen in?',
    subfields: {}
  },
  message: {
    id: 'message',
    type: 'textarea',
    value: '',
    placeholder: 'Detailed Message',
    subfields: {}
  }
}