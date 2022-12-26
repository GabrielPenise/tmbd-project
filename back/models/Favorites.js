const db = require("./database.js");
const S = require("sequelize");

class Favorites extends S.Model {}
Favorites.init({}, { sequelize: db, modelName: "favorites" });

module.exports = Favorites;
