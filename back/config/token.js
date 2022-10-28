const jwt = require("jsonwebtoken");
const secretString = "youDontKnowThePass";

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretString, { expiresIn: "2d" });
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, secretString); //Retorna el payload
};

module.exports = { generateToken, validateToken };
