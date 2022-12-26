const { generateToken } = require("../config/token");
const UserServices = require("../services/UserServices");

class UserController {
  static async registerUser(req, res, next) {
    const { error, data } = await UserServices.registerUser(req.body);
    if (error) {
      return res
        .status(data.status || 500)
        .send({ message: data.message || data });
    }

    res.status(201).send(data);
  }

  static async allUser(req, res, next) {
    const { error, data } = await UserServices.allUser;
    if (error) {
      return res
        .status(data.status || 500)
        .send({ message: data.message || data })
        .next();
    }
    res.status(200).send(data);
  }

  static async findOne(req, res, next) {
    const { email, lastname } = req.query;
    const { error, data } = await UserServices.findOne(email, lastname);
    if (error) {
      return res
        .status(data.status || 500)
        .send({ message: data.message || data })
        .next();
    }
    res.status(200).send(data);
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    const { error, data } = await UserServices.login(email, password);
    if (error) {
      return res
        .status(data.status || 401)
        .send({ message: data.message || data })
        .next();
    }

    const token = generateToken(data);
    res.cookie("tokenUser", token);
    res.status(201).send(data);
  }
}

module.exports = UserController;
