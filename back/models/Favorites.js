const db = require("./database.js");
const S = require("sequelize");

class Favorites extends S.Model {}
Favorites.init({});
