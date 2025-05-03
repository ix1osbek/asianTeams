// docs/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Asian Teams API',
      version: '1.0.0',
      description: 'League va Club APIlar uchun Swagger hujjati',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // bu yo‘l to‘g‘ri bo‘lishi kerak
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec
