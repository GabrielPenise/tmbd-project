const { validateToken } = require("../config/token");

const validateAuth = (req, res, next) => {
  const cookieToken = req.cookies.tokenUser;
  //Valido Si hay Cookie
  if (!cookieToken) return res.sendStatus(401);

  //valido si Esta bien la firma del token
  const { name, email, lastname } = validateToken(cookieToken);
  if (!name) return res.sendStatus(401);

  req.user = { name, email, lastname };

  next();
};

module.exports = validateAuth;
