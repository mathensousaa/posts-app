"use strict";

require("dotenv").config();
const path = require("path");
const { Sequelize } = require("sequelize");
const { MySqlDialect } = require("@sequelize/mysql");

module.exports = new Sequelize({
  // dialect: MySqlDialect,
  // database: process.env.db_name,
  // user: process.env.db_user,
  // password: process.env.db_password,
  // host: process.env.db_hostname,
  // port: 3306,

  dialect: "sqlite",
  storage: path.join(__dirname, "posts_app.sqlite"),
});
