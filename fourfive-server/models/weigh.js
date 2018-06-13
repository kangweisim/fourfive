const Sequelize = require("sequelize");
const sequelize = require("./index").sequelize;
const User = require("./user.js");
const Weigh = sequelize.define("weigh", {
  weight: {
    type: Sequelize.INTEGER,
  }
}, {
  paranoid: true
});
Weigh.belongsTo(User);
Weigh.sync();

module.exports = Weigh;
