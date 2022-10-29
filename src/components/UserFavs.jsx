import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { get, getUsersFavorites } from "../utils/pedidos";
import MovieGrid from "./MovieGrid";
import { useSearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router";

export default function ProfileFavs() {
  const { setSearchText } = useSearchContext();

  const [listMovies, setListMovies] = useState([]);
  const { user } = useAuthContext();

  const listaDeFavs = async () => {
    //trae los favs del usuario pasado por parametro, y los transforma en objeto json
    try {
      const favorites = await getUsersFavorites(user);

      const mapeoFavs = await favorites.data.map(async (element) => {
        const { id, type } = JSON.parse(element);
        const pelicula = await get(`/${type}/${id}`);

        return pelicula;
      });

      Promise.all(mapeoFavs).then((res) => setListMovies(res));
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    setSearchText(null);
    listaDeFavs();
  }, []);

  if (!listMovies) return <div>Loading..</div>;

  return (
    <>
      <div>
        <h2>Peliculas Favoritas</h2>
        <MovieGrid listMovies={listMovies} />
      </div>
    </>
  );
}
