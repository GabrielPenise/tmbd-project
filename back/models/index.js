const Users = require("./Users");
const Favorites = require("./Favorites");
const Movies = require("./Movies");

Favorites.belongsTo(Users);
Favorites.belongsTo(Movies);
module.exports = { Users, Favorites };
