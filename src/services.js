/* eslint-disable camelcase */
function evaluateCondition({ field, condition, condition_value }) {
  switch (condition) {
  case 'neq': return field !== condition_value;
  case 'gt': return field > condition_value;
  case 'gte': return field >= condition_value;
  case 'contains': return field.indexOf(condition_value) > -1;
  default: return field === condition_value;
  }
}

function throwError(errorName, errorData, status) {
  const error = new Error(errorName);
  error.data = errorData;
  error.status = status;
  throw error;
}
exports.throwError = throwError;

/**
 * Retrieves object containing applicant's data
 *
 * @returns Object containing applicant's data
 */
exports.retrieveApplicantData = () => ({
  data: {
    name: 'Fisayo Agboola',
    github: '@FreezyAG',
    email: 'agboolafisayo252@gmail.com',
    mobile: '08185194353',
    twitter: '@freezAYO',
  },
});

/**
   * Validate the rule-and-condition payload
   * @param data - Object
   *
   * @returns String
   */
exports.validatePayload = async (data) => {
  const ruleFieldValue = data.rule.field.split('.').reduce((obj, i) => obj[i], data.data);

  if (!ruleFieldValue) {
    return throwError('Missing field.', `field ${data.rule.field} is missing from data.`, 400);
  }
  return evaluateCondition({ ...data.rule, ...{ field: ruleFieldValue } });
};
