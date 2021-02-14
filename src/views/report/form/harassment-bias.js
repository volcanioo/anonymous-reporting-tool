import TYPES from './TYPES';

export const harassmentOrBias = {
  harassmentType: {
    parentField: TYPES.HARASSMENT_OR_BIAS,
    type: 'select',
    value: '-1',
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
  },
  toWho: {
    parentField: TYPES.HARASSMENT_OR_BIAS,
    type: 'select',
    value: '-1',
    options: [
      'Did this happen to you or someone else?',
      'Me',
      'Someone else',
    ]
  },
  whenDidHappen: {
    parentField: TYPES.HARASSMENT_OR_BIAS,
    type: 'select',
    value: '-1',
    options: [
      'When did this happen?',
      'Lately',
      'In the past month',
      'In the past year',
      'More than a year ago',
    ]
  },
  whichDepartment: {
    parentField: TYPES.HARASSMENT_OR_BIAS,
    type: 'input',
    value: '',
    placeholder: 'Which department did this happen in?',
  }
};