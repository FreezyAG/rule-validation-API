const { throwError } = require('./services');

exports.cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

exports.validateReqBody = (req, res, next) => {
  if (typeof req.body === 'object' && !Array.isArray(req.body)) {
    next();
  } else {
    next(throwError('Invalid JSON.', 'Invalid JSON payload passed.', 400));
  }
};

function formatErrorMessage(errorData) {
  let errMessage = errorData[0].replace(/"/g, '');
  errMessage = errMessage.replace(/must be of type/g, 'should be an');
  return `${errMessage}.`;
}

exports.validate = (Schema) => ((req, _res, next) => {
  try {
    const { error } = Schema.validate(req.body);
    if (!error) return next();
    const err = new Error('Validation Error.');
    err.data = formatErrorMessage(error.details.map((errorObject) => errorObject.message));
    err.statusCode = 400;
    return next(err);
  } catch (error) {
    return next(error);
  }
});
