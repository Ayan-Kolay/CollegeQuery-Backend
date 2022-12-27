"use strict";

require("dotenv").config();

const common = require("./components/common");
const user = require("./components/user");


module.exports = Object.assign({}, common, user, mysql);
