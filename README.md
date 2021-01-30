# Rule-validation-API
A simple rule validation API

**Author:** Fisayo Agboola

**Environments**

Node version - v12.18.4 (LTS)

**This application uses the following technologies:**

- nodeJs
- expressJs
- jest
- supertest
- winston

**Install all dependencies**

```
npm install
```

**Start the application**

```
npm start
```

**Test the application**

```
npm test
```

## Get Route -

**Endpoint** `{{baseUrl}}/` - method (GET)

**Response format**

```json
{
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
        "name": "Amos Burton",
        "github": "@amosburton",
        "email": "amosburton@rocinantecrew.com",
        "mobile": "08069920011",
        "twitter": "@amosb"
    }
}
```

## Post Route -

**Endpoint** `{{baseUrl}}/validate-rule` - method (POST)

**Payload**

```json
{
  "rule": {
    "field": "missions.count",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      "count": 45,
      "successful": 44,
      "failed": 1
    }
  }
}
```

**Response format**

```json
{
  "message": "field missions.count successfully validated.",
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions.count",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}
```

## The Design Principles used are:
 - Single Responsibility Principle
 - Dependency Inversion Principle
 - DRY Principle
 - KISS Principle
 - YAGNI Principle
