"use strict";

const joi = require("joi");

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .default("test"),
    PORT: joi.number().default(3000),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(
    `Config validation error in users' secret env: ${error.message}`
  );
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === "test",
  isDevelopment: envVars.NODE_ENV === "development",
  server: {
    port: envVars.PORT,
  },
};

module.exports = config;
