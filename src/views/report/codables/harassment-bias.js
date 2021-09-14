import TYPES from './TYPES';

export default {
  harassmentType: {
    id: 'harassmentType',
    parentField: TYPES.HARASSMENT_OR_BIAS,
    type: 'select',
    value: '',
    options: [
      'What type of issue did you experience?',
      'Sexual advances, requests for sexual favors',
      'Verbal abuse or threats',
      'Physical assaults',
      'Unwelcome jokes or comments',
      'Intimidation or bullying',
      'Unwanted physical contact (hugging, kissing, touching)',
      'Subtle bias',
      'Other (please describe below)',
    ],
    validate: (value) => {
      if (value === -1 || value === '') {
        return false;
      }

      return true;
    },
  },
  toWho: {
    id: 'toWho',
    parentField: TYPES.HARASSMENT_OR_BIAS,
    type: 'select',
    value: '',
    options: [
      'Did this happen to you or someone else?',
      'Me',
      'Someone else',
    ],
    validate: (value) => {
      if (value === -1 || value === '') {
        return false;
      }

      return true;
    },
  },
  whenDidHappen: {
    id: 'whenDidHappen',
    parentField: TYPES.HARASSMENT_OR_BIAS,
    type: 'select',
    value: '',
    options: [
      'When did this happen?',
      'Lately',
      'In the past month',
      'In the past year',
      'More than a year ago',
    ],
    validate: (value) => {
      if (value === -1 || value === '') {
        return false;
      }

      return true;
    },
  },
};
