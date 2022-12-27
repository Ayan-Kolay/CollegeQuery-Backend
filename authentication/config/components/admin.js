"use strict";

const joi = require("joi");

const envVarsSchema = joi
  .object({
    JWT_KEY_ADMIN: joi.string().required(),
    JWT_EXPIRES_IN_ADMIN: joi.string().required(),
    JWT_ALGORITHM: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error in admin' secret env: ${error.message}`);
}

const config = {
  secrets: {
    jwt_admin: envVars.JWT_KEY_ADMIN,
    jwtExp_admin: envVars.JWT_EXPIRES_IN,
    jwtAlgorithm: envVars.JWT_ALGORITHM,
  },
};

module.exports = config;