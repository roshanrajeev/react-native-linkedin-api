const { DataTypes } = require("sequelize");
const sequelize = require("./db-config");

const User = sequelize.define(
  "user",
  {
    uid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {}
);

module.exports = {
  User,
};
