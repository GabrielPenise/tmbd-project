import React from "react";
import Card from "./Card";
import UserCard from "./UserCard";

export default function MovieGrid({ listMovies }) {
  if (!listMovies || listMovies.length === 0) return <div>Loading...</div>;
  if (!listMovies[0]?.email) {
    return (
      <div>
        <ul className="layoutDePelis">
          {listMovies?.map((element) => {
            return <Card key={element.id} movie={element} />;
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <ul className="layoutDePelis">
          {listMovies?.map((element) => {
            return <UserCard key={element.id} usuarioCard={element} />;
          })}
        </ul>
      </div>
    );
  }
}
