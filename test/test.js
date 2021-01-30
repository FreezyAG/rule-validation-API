/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');

const serverRoutes = require('../src/route');
const errorHandler = require('../src/error');

const app = express();
app.use(bodyParser.json());

app.use('/', serverRoutes);
app.use(errorHandler);

describe('testing-GET-route', () => {
  it('returns the applicant\'s details', async (done) => {
    const { body } = await request(app).get('/');
    expect(body).toEqual({
      message: 'My Rule-Validation API',
      status: 'success',
      data: {
        data: {
          name: 'Fisayo Agboola',
          github: '@FreezyAG',
          email: 'agboolafisayo252@gmail.com',
          mobile: '08185194353',
          twitter: '@freezAYO',
        },
      },
    });
    done();
  });
});

describe('testing-POST-route', () => {
  it(`returns 'field [name of field] successfully validated.' 
  when the rule is successfully validated`, async (done) => {
    const requestBody = {
      rule: {
        field: 'missions.count',
        condition: 'gte',
        condition_value: 30,
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: {
          count: 45,
          successful: 44,
          failed: 1,
        },
      },
    };
    const { body } = await request(app)
      .post('/validate-rule')
      .send(requestBody);

    expect(body).toEqual({
      message: 'field missions.count successfully validated.',
      status: 'success',
      data: {
        validation: {
          error: false,
          field: 'missions.count',
          field_value: 45,
          condition: 'gte',
          condition_value: 30,
        },
      },
    });
    done();
  });

  it(`returns 'field [name of field] failed validation.'
  when the rule validation fails`, async (done) => {
    const requestBody = {
      rule: {
        field: '0',
        condition: 'eq',
        condition_value: 'a',
      },
      data: 'damien-marley',
    };

    const { body } = await request(app).post('/validate-rule').send(requestBody); // uses the request function that calls on express app instance
    expect(body).toEqual({
      message: 'field 0 failed validation.',
      status: 'error',
      data: {
        validation: {
          error: true,
          field: '0',
          field_value: 'd',
          condition: 'eq',
          condition_value: 'a',
        },
      },
    });
    done();
  });

  it(`returns 'field [name of field] is missing from data.'
  when the field specified in the rule object is missing from the data passed`, async (done) => {
    const requestBody = {
      rule: {
        field: 'missions.count',
        condition: 'gte',
        condition_value: 30,
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        notMission: {
          notCount: 45,
          successful: 44,
          failed: 1,
        },
      },
    };

    const { body } = await request(app).post('/validate-rule').send(requestBody);
    expect(body).toEqual({
      message: 'field missions.count is missing from data.',
      status: 'error',
      data: null,
    });
    done();
  });

  it(`returns '[name of field] should be an [required field type].'
  when an wrong type is passed`, async (done) => {
    const requestBody = {
      rule: 6,
      data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
    };

    const { body } = await request(app).post('/validate-rule').send(requestBody);
    expect(body).toEqual({
      message: 'rule should be an object.',
      status: 'error',
      data: null,
    });
    done();
  });

  it(`returns '[name of field] is required.'
  when a required field is not passed`, async (done) => {
    const requestBody = {
      data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
    };

    const { body } = await request(app).post('/validate-rule').send(requestBody);
    expect(body).toEqual({
      message: 'rule is required.',
      status: 'error',
      data: null,
    });
    done();
  });

  it(`returns 'Invalid JSON payload passed.'
  when an invalid JSON payload is passed to the API`, async (done) => {
    const requestBody = ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'];

    const { body } = await request(app).post('/validate-rule').send(requestBody);
    expect(body).toEqual({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    });
    done();
  });
});
