const Sequelize = require("sequelize");
const { options, database } = require("../config/configdb.json"); //Contiene los settings de sequelize

const db = new Sequelize(database, "postgres", "postgre", options);

module.exports = db;
