import React from "react";

export default function CardSoloMovie({ movie }) {
  return (
    <div class="card-solo">
      <div
        class="img1"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
        }}
      ></div>
    </div>
  );
}
