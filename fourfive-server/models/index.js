const mysql = require("mysql");
const Sequelize = require('sequelize');
const { DATABASE_NAME, MYSQL_USER, MYSQL_PASSWORD } = process.env;
const sequelize = new Sequelize(DATABASE_NAME, MYSQL_USER, MYSQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  timezone: "+08:00",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully");
}).catch(err => {
  console.log("Unable to connect to the database", err);
})

module.exports.sequelize = sequelize;
module.exports.User = require("./user");
module.exports.Weigh = require("./weigh");
// module.exports.Message = require("./message");
