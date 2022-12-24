const { Users } = require("../models/index.js");

class UserServices {
  //Registrar Usuario
  static async registerUser(body) {
    try {
      const response = await Users.create(body);

      return { error: false, data: response };
    } catch (error) {
      console.log("error es ", error);
      return {
        error: true,
        data: "Problema al registrarse verificar los datos",
      };
    }
  }

  //Traer Usuario

  static async allUser() {
    try {
      const response = await Users.findAll();

      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async findOne(email, lastname) {
    try {
      const response = await Users.findOne({
        where: {
          email,
          lastname,
        },
      });

      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async login(email, password) {
    try {
      const usuario = await Users.findOne({
        where: {
          email,
        },
      });

      const { email, name, lastname } = usuario;
      const isValid = usuario.validatePassword(password);
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = UserServices;
