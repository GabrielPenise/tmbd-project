const Sequelize = require("sequelize");
const { options, database } = require("../config/configdb.json"); //Contiene los settings de sequelize

const db = new Sequelize(database, null, null, options);

module.exports = db;
