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

function sendResponse(body, status, isError, validationResponse) {
  return {
    message: `field ${body.rule.field} ${validationResponse}.`,
    status,
    data: {
      validation: {
        error: isError,
        field: body.rule.field,
        field_value: body.rule.field.split('.').reduce((obj, i) => obj[i], body.data),
        condition: body.rule.condition,
        condition_value: body.rule.condition_value,
      },
    },
  };
}

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
  try {
    const ruleFieldValue = data.rule.field.split('.').reduce((obj, i) => obj[i], data.data);

    if (!ruleFieldValue) {
      return throwError('Missing field.', `field ${data.rule.field} is missing from data.`, 400);
    }
    return evaluateCondition({ ...data.rule, ...{ field: ruleFieldValue } });
  } catch (error) {
    return throwError('Missing field.', `field ${data.rule.field} is missing from data.`, 400);
  }
};

exports.throwError = throwError;
exports.sendResponse = sendResponse;
