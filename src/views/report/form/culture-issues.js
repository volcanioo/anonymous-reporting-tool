export const culturalIssues = {
  issueType: {
    parentField: TYPES.CULTURE_ISSUES,
    type: 'select',
    value: '-1',
    options: [
      'What type of issue did you experience?',
      'Culture is not welcoming or inclusive',
      'Micromanaging / lack of autonomy',
      'Not enough collabration / social support',
      'Long working hours / lack of work-life balance',
      'Not being heard, acknowledged, or recognized',
      'Lack of opportunity to grow / develop',
      'Punished for mistakes and failures',
      'Other (please describe below)',
    ],
  },
  whichDepartmentDidThisHappen: {
    parentField: TYPES.CULTURE_ISSUES,
    type: 'input',
    value: '',
    placeholder: 'Which department did this happen in?',
  }
};