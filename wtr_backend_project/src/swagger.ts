import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerApp = express();

const specs = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Ponto Certo API", // Title of your documentation
      version: "0.1.0", // Version of your API
      description: "API documentation for Ponto Certo app",
    },
  },
  securityDefinitions: {
    CookieAuth: {
      type: 'apiKey',
      name: 'token',
      in: 'cookie',
    },
  },
  apis: ["./src/routes/*.ts"], // Define the paths to your route files
});

// Serve Swagger documentation using Swagger UI
swaggerApp.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

export default swaggerApp;
