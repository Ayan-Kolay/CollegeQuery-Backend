"use strict";

const joi = require("joi");

const envVarsSchema = joi
  .object({
    MYSQL_HOST: joi.string().default("localhost"),
    MYSQL_PORT: joi.number().default(3306),
    MYSQL_USER: joi.string().default("root"),
    MYSQL_PASSWORD: joi.string().default(null),
    MYSQL_DATABASE: joi.string().required(),
    MYSQL_WAIT_FOR_CONNECTIONS: joi.boolean().truthy("true").falsy("false").default(true),
    MYSQL_CONNECTION_LIMIT: joi.number().default(30),
    MYSQL_QUEUE_LIMIT: joi.number().default(0),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error in mysql env: ${error.message}`);
}

const config = {
  db: {
    host: envVars.MYSQL_HOST,
    port: envVars.MYSQL_PORT,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
    database: envVars.MYSQL_DATABASE,
    waitForConnections: envVars.MYSQL_WAIT_FOR_CONNECTIONS,
    connectionLimit: envVars.MYSQL_CONNECTION_LIMIT,
    queueLimit: envVars.MYSQL_QUEUE_LIMIT,
  },
};

module.exports = config;
