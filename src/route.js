const express = require('express');

const router = express.Router();
const { getApplicantData, validatePayload } = require('./controller');

const { validateReqBody, validate } = require('./middleware');
const { schema } = require('./schema');

router.get('/', getApplicantData);
router.post('/validate-rule', validateReqBody, validate(schema), validatePayload);

module.exports = router;
