"use strict";

const joi = require("joi");

const envVarsSchema = joi
  .object({
    EMAIL_HOST: joi.string().required(),
    EMAIL_USER: joi.string().required(),
    EMAIL_PASS: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error in users' secret env: ${error.message}`);
}

const config = {
  secrets: {
    email_host: envVars.EMAIL_HOST,
    email_user: envVars.EMAIL_USER,
    email_pass: envVars.EMAIL_PASS,
  },
};

module.exports = config;