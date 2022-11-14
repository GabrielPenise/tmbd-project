import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";

export default function UserProfileMain() {
  const urlImg =
    "https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg";

  const { user } = useAuthContext();
  const { email, lastname } = user;
  const [startUser, setStartUser] = useState("2002");
  const { setSearchText } = useSearchContext();

  useEffect(() => {
    setSearchText(null);
    axios
      .get("http://localhost:5000/api/users/findOne", {
        params: { email, lastname },
      })
      .then((date) => {
        setStartUser(date.data.createdAt.slice(0, 4));
      });
  }, []);

  return (
    <>
      <div
        className="solo-movie-profile"
        style={{ backgroundImage: `url(${urlImg})` }}
      >
        <div className="user-info-profile">
          <div className="plain-text-user-profile">
            <h1>{`Bienvenido ${user.name} ${user.lastname}`} </h1>
            {!startUser ? (
              <div>Loading..</div>
            ) : (
              <span>{`(Member since ${startUser} )`}</span>
            )}
          </div>
          <div className="nav-profile-container">
            <br />
            <div className="nav-profile-buttons">
              <Link to="usuarios">
                <button className="profile-btn">Usuarios</button>
              </Link>
              <Link to="friends">
                <button className="profile-btn">Amigos</button>
              </Link>
              <Link to="favorites">
                <button className="profile-btn">Favoritos</button>
              </Link>
              <Link to="/search">
                <button className="profile-btn">Search</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
