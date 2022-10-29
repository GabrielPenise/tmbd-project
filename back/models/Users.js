const db = require("./database.js");
const S = require("sequelize");
const bcrypt = require("bcrypt");

class Users extends S.Model {
  //-------------instance methods----------------//
  findOneFriends(usuario) {
    const bool = this.amigos.includes(usuario);
    return bool;
  }

  removeFriend(usuario) {
    const index = this.amigos.indexOf(usuario);
    this.amigos.splice(index, 1);
  }

  findOneFavorites(idFilm) {
    const bool = this.favorites.includes(idFilm);

    return bool;
  }

  removeFilmFromFavorites(favorites) {
    const index = this.favorites.indexOf(favorites);
    this.favorites.splice(index, 1);
  }

  //passwordHash podria ejecutarlo directamente en la query del controller en el endpoint, pero de esta manera es mas practico y entendible
  passwordHash(pass, salt) {
    return bcrypt.hash(pass, salt);
  }

  //validatePass
  validatePassword(pass) {
    return this.passwordHash(pass, this.salt).then(
      (newHash) => this.password === newHash
    );
  }
}

Users.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    salt: {
      type: S.STRING,
    },
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    favorites: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
    },
    amigos: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
    },
  },

  { sequelize: db, modelName: "users" }
);

//Hooks
Users.beforeCreate((usuario) => {
  const userSalt = bcrypt.genSaltSync();
  usuario.salt = userSalt;

  //Le paso al metodo de instancia la pw en texto plano y el salt
  //Luego agarro la pw hasheada y la guardo
  return usuario
    .passwordHash(usuario.password, usuario.salt)
    .then((hashedPass) => {
      usuario.password = hashedPass;
    });
});

module.exports = Users;
