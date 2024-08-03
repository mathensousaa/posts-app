const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
});
