"use strict";

const joi = require("joi");

const envVarsSchema = joi
  .object({
    JWT_KEY_VERIFIED: joi.string().required(),
    JWT_KEY_UNVERIFIED: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    JWT_ALGORITHM: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error in users' secret env: ${error.message}`);
}

const config = {
  secrets: {
    jwt_verified: envVars.JWT_KEY_VERIFIED,
    jwt_unverified: envVars.JWT_KEY_UNVERIFIED,
    jwtExp: envVars.JWT_EXPIRES_IN,
    jwtAlgorithm: envVars.JWT_ALGORITHM,
  },
};

module.exports = config;