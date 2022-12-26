const db = require("./database");
const S = require("sequelize");

class Movies extends S.Model {}

Movies.init(
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
  { sequelize: db, modelName: "movies" }
);

module.exports = Movies;
