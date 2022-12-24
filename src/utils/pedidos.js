import axios from "axios";
import { Axios } from ".";

const api = "https://api.themoviedb.org/3";
const searchUrl =
  api +
  "/search/multi?api_key=42c75a6b80c35f26dc7f205b88001ee4&language=en-US&query=";

//get default de la api, puede variar el path si quiero consultar varias cosas//
export const get = (path) => {
  return axios
    .get(api + path, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM3NWE2YjgwYzM1ZjI2ZGM3ZjIwNWI4ODAwMWVlNCIsInN1YiI6IjYzNTZiMDc0YzlkYmY5MDA3ZjAzNmQ1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-A7s9o4Cod-hTqNBUwyqyqxBDKfIQZzCeEh5yOwTYE",
        "Content-Type": "application/json;charset=utf-8",
      },
    })
    .then((result) => result.data)
    .catch((err) => console.log("log problem", err));
};

//Recibe una opcion de busqueda y ejecuta la consulta
export const getSearch = (searchOption) => {
  return axios
    .get(searchUrl + searchOption)
    .then((result) => result.data)
    .catch((err) => console.log("Error No encontrado"));
};

//Recibe un user y un id, para hacer la consulta en la api local host, en caso de que lo tenga esto retorna true o false
export const getFindOneFavorites = (usuario, id) => {
  return axios
    .get("/api/users/favorites/film", {
      params: { ...usuario, id },
    })
    .then((usuario) => usuario);
};

export const getUsersFavorites = (usuario) => {
  return axios.get("/api/users/favorites", {
    params: {
      ...usuario,
    },
  });
};
