const { response } = require("express");
const { Users } = require("../models/index.js");

class UserServices {
  //Registrar Usuario
  static async registerUser(body) {
    try {
      response = await Users.create(body);

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
      response = await Users.findAll();

      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = UserServices;
