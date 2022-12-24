const Users = require("./Users");
const Favorites = require("./Favorites");

Favorites.belongsTo(Users);

module.exports = { Users, Favorites };
