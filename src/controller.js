/* eslint-disable consistent-return */
const { retrieveApplicantData, validatePayload, sendResponse } = require('./services');

exports.getApplicantData = async (req, res, next) => {
  try {
    res.json({
      message: 'My Rule-Validation API',
      status: 'success',
      data: retrieveApplicantData(),
    });
  } catch (error) {
    return error.status ? next(error) : next({ ...error, ...{ status: 400 } });
  }
};

exports.validatePayload = async (req, res, next) => {
  try {
    const { body } = req;
    const validationSuccessful = await validatePayload(body);

    if (!validationSuccessful) {
      return res.status(400).json(sendResponse(body, 'error', true, 'failed validation'));
    }
    res.status(200).json(sendResponse(body, 'success', false, 'successfully validated'));
  } catch (error) {
    return error.status ? next(error) : next({ ...error, ...{ status: 400 } });
  }
};
