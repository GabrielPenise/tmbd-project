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
        .send({ message: data.message || data });
    }
    res.status(200).send(data);
  }
}

module.exports = UserController;
