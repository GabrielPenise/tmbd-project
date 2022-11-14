import React, { useEffect, useState } from "react";
import Navbar from "./commons/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import axios from "axios";

import UserLoguin from "./components/UserLoguin";
import UserRegister from "./components/UserRegister";
import SoloMovie from "./components/SoloMovie";
import HomePage from "./commons/HomePage";
import UserFavs from "./components/UserFavs";
import UserProfileMain from "./components/UserProfileMain";

import UsersList from "./commons/UsersList";
import UsersFriendsContent from "./commons/UsersFriendsContent";

function App() {
  const { setUser, user } = useAuthContext();

  useEffect(() => {
    axios
      .get("/api/users/auth")
      .then((res) => res.data)
      .then((usuario) => {
        setUser(usuario);
      })
      .catch((err) => console.log(err, "cookie no encontrada"));
  }, []);

  return (
    <>
      <Navbar />

      <div className="App">
        <Routes>
          {!user ? (
            <Route path="/" element={<UserLoguin />} />
          ) : (
            <>
              <Route
                path={`/`}
                element={<Navigate to={`/${user.name}${user.lastname}`} />}
              />
              <Route path="/search" element={<HomePage />} />
              <Route path="/movie/:id" element={<SoloMovie />} />
              <Route path="/serie/:id" element={<SoloMovie />} />
              <Route
                path={`/${user.name}${user.lastname}`}
                element={<UserProfileMain />}
              />
              <Route
                path={`/${user.name}${user.lastname}/favorites`}
                element={<UserFavs />}
              />
              <Route
                path={`/${user.name}${user.lastname}/usuarios`}
                element={<UsersList />}
              />
              <Route
                path={`/${user.name}${user.lastname}/friends`}
                element={<UsersFriendsContent />}
              />
            </>
          )}

          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

//Mostrar los routes si el user esta ON
//useEffect // axios pido al me y ahi acorde al a rta armo a la condicion, seteo userGlobal o no
//Y en el index solo renderizo si hay un usuario en el global contex/
//Index con login // si recibo el usuario renderizo sino, persiste el login
