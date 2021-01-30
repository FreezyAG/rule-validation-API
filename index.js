require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./src/lib/logger');

const { cors } = require('./src/middleware');
const validationRoute = require('./src/route');
const errorHandler = require('./src/error');

const app = express();

const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors);

app.use(bodyParser.json());

// Routes
app.use('/', validationRoute);

// Global error handler
app.use(errorHandler);

app.listen(port, () => logger.info(`server connected at port: ${port}`));
