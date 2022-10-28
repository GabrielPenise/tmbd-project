import axios from "axios";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function UserLoguin() {
  //UseFullVars
  const initialState = { email: "", password: "" };

  //HOOKS
  const [login, setLoguin] = useState(initialState);

  const navigate = useNavigate();

  const { user, setUser } = useAuthContext();

  //Handles and Functions

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoguin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/login", login)
      .then((usuario) => {
        setUser(usuario.data);
        navigate(`/${usuario.data.name}${usuario.data.lastname}`);
      })
      .catch(() => {
        alert("Usuario o contraseña incorrecta");
        setLoguin(initialState);
      });
  };
  return (
    <>
      <div className="container">
        <div className="form-loguin">
          <form onSubmit={handleSubmit} className="logueando">
            <div className="bienvenida">Welcome, Please Sing Up</div>
            <br></br>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={login.email}
              onChange={handleInput}
              placeholder="Email..."
              required
            />
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              name="password"
              value={login.password}
              onChange={handleInput}
              placeholder="Password..."
              required
            />
            <div className="bottons form-bottons">
              <br></br>

              <button type="submit">Ingresa</button>

              <Link to="/register">
                <button className="form-bottons">Registrate</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
