const db = require("./database.js");
const S = require("sequelize");

class Favorites extends S.Model {}
Favorites.init(
  {
    id_film: {
      type: S.INTEGER,
      primaryKey: true,
    },
    poster_path: {
      type: S.STRING,
    },
    media_type: {
      type: S.STRING,
    },
    id: {
      type: S.INTEGER,
    },
    original_title: {
      type: S.STRING,
    },
    original_name: {
      type: S.STRING,
    },
    overview: {
      type: S.STRING,
    },
    first_air_date: {
      type: S.STRING,
    },
    release_date: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "favorites" }
);

module.exports = Favorites;
