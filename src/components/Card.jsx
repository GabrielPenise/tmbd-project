import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Card({ movie }) {
  return (
    <>
      <Link
        to={`/${movie.media_type === "tv" ? "serie" : "movie"}/${movie.id}`}
      >
        <li>
          <div class="card">
            <div
              class="img1"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              }}
            ></div>

            <div class="title">
              {movie.original_title || movie.original_name}
            </div>
            <div class="text">{movie.overview}</div>

            <div class="catagory">
              {movie.media_type === "tv" ? "Serie" : "Movie"}{" "}
              <i class="fas fa-film"></i>
            </div>

            <div class="views">
              {movie.first_air_date || movie.release_date}
              <i class="far fa-eye"></i>{" "}
            </div>
          </div>
        </li>
      </Link>
    </>
  );
}
