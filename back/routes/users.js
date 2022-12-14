const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");
const validateAuth = require("../middlewares/auth");

router.get("/", UserController.allUser);

router.get("/findOne", UserController.findOne);

router.post("/register", UserController.registerUser);

router.post("/login", UserController.login);

router.get("/auth", validateAuth, (req, res, next) => {
  res.send(req.user);

  //el auth es mas que nada para checkear si ya esta el cookie creado
  //Si no hay token, 401
  //SI hay tengo que validar si el token es correcto con la fn validateToken
  //si no es valido 401
  //Si es valido devuelvo el usuario//

  //PRacticamente todo ese checkeo me lo realica el middleware que cree en valideAuth
});

router.post("/logout", validateAuth, (req, res, next) => {
  res.clearCookie("tokenUser");

  res.sendStatus(204);
});

// router.put("/", (req, res, next) => {
//   const { email, lastname, id, type } = req.body;
//   const favorites = JSON.stringify({ id, type });
//   Users.findOne({
//     where: {
//       email,
//       lastname,
//     },
//   }).then((usuario) => {
//     const boolFavoriteUser = usuario.findOneFavorites(favorites);
//     !boolFavoriteUser
//       ? (usuario.favorites = [...usuario.favorites, favorites])
//       : (usuario.favorites = usuario.favorites.filter((pelicula) => {
//           return pelicula !== favorites;
//         }));

//     usuario.save();
//   });

//   res.sendStatus(204);
// });

// //Esta ruta solo indica si tiene o no determinado favorito
// router.get("/favorites/film", (req, res, next) => {
//   const { email, lastname, id } = req.query;

//   Users.findOne({
//     where: {
//       email,
//       lastname,
//     },
//   }).then((usuario) => {
//     const boolFavoriteUser = usuario.findOneFavorites(JSON.stringify(id));

//     res.send(boolFavoriteUser).status(200);
//   });
// });

//Esta ruta recibe el usuario y un amigo, y verifica si este lo tiene en el array//
// router.get("/findOne/amigo", (req, res, next) => {
//   const { lastname, email, usuarioCard } = req.query;

//   const amigo = JSON.stringify({
//     name: usuarioCard.name,
//     lastname: usuarioCard.lastname,
//     email: usuarioCard.email,
//   });
//   Users.findOne({
//     where: {
//       email,
//       lastname,
//     },
//   }).then((usuario) => {
//     const boolAmigo = usuario.findOneFriends(amigo);

//     res.send(boolAmigo).status(200);
//   });
// });

//Esto trate todos los favoritos de un usuario especifico, se podria refactorizar el codigo
// router.get("/favorites", (req, res, next) => {
//   const { email, lastname } = req.query;
//   Users.findOne({
//     where: {
//       email,
//       lastname,
//     },
//   }).then((usuario) => res.send(usuario.favorites));
// });

//Esta ruta agrega y saca amigos a favorito, recibe un usario y un amigo
// router.put("/friends", (req, res, next) => {
//   const { lastname, email, usuarioCard } = req.body;

//   const amigo = JSON.stringify({
//     name: usuarioCard.name,
//     lastname: usuarioCard.lastname,
//     email: usuarioCard.email,
//   });

//   Users.findOne({
//     where: {
//       email,
//       lastname,
//     },
//   }).then((usuario) => {
//     const boolFriends = usuario.findOneFriends(amigo);
//     if (!boolFriends) {
//       usuario.amigos = [...usuario.amigos, amigo];
//     } else {
//       usuario.amigos = usuario.amigos.filter((amigos) => {
//         return amigos !== amigo;
//       });
//       console.log(" esto es post filter", usuario.amigos);
//     }
//     usuario.save();
//   });
//   res.sendStatus(204);
// });

module.exports = router;
