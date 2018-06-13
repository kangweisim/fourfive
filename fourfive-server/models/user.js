const Sequelize = require("sequelize");
const sequelize = require("./index").sequelize;
const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  paranoid: true
});

User.sync();
module.exports = User;
