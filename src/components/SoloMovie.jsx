import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";
import { get, getFindOneFavorites } from "../utils/pedidos";

import CardSoloMovie from "./CardSoloMovie";

export default function SoloMovie() {
  //Context Hooks
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { searchText, setSearchText } = useSearchContext();

  //Local States Hooks
  const [movie, setMovie] = useState(undefined);
  const [favorites, setFavorites] = useState("");
  const [boton, setBoton] = useState("");

  //Usefull vars
  const showdataId = useLocation().pathname.split("/");
  if (showdataId[1] === "serie") showdataId[1] = "tv";

  useEffect(() => {
    //Trae la peli especifica desde el pathname
    get(`/${showdataId[1]}/${showdataId[2]}`).then((res) => {
      setMovie(res);
      setSearchText(null);
    });

    //Devuelve un bool acorde al usuario si lo tiene en fav la peli o no
    getFindOneFavorites(user, { id: showdataId[2], type: showdataId[1] }).then(
      (favfilm) => {
        favfilm.data
          ? setBoton("Quitar de favoritos")
          : setBoton("Agregar a favoritos");
      }
    );
  }, [favorites]);

  const handleFavorite = (e) => {
    axios.put("/api/users", {
      ...user,
      id: showdataId[2],
      type: showdataId[1],
    });
    favorites ? setFavorites(false) : setFavorites(true);
  };

  if (!movie) return <div>loading..</div>;

  return (
    <div className="container">
      <div
        className="solo-movie"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          width: "100%",
          height: "200px",
        }}
      >
        <div className="solo-movie-card">
          <div>
            <CardSoloMovie movie={movie}></CardSoloMovie>
          </div>
        </div>
        <div className="space-and-text">
          <div className="solo-movie-header-title">
            <h1 className="solo-movie-title">
              {movie.original_title || movie.original_name}
            </h1>
            <span>{movie.first_air_date || movie.release_date}</span>
            <p>
              {movie.genres.map((mov) => {
                return mov.name + " ";
              })}
            </p>
          </div>
          <div className="solo-movie-header-content">
            <q className="qoute-solo-movie">{movie.tagline}</q>
            <input type="button" value={boton} onClick={handleFavorite} />
            <p>{movie.overview}</p>
            <ol className="creator-solo-movie">
              {movie.created_by ? (
                movie.created_by.map((autor, i) => {
                  return (
                    <li key={i}>
                      <p>{autor.name}</p>
                      <p>Creator</p>
                    </li>
                  );
                })
              ) : (
                <div>...</div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
