import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();
  const initialState = { email: "", password: "", name: "", lastname: "" };
  const [registerPayload, setRegisterPayload] = useState(initialState);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterPayload({ ...registerPayload, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/users/register", registerPayload);
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="form-loguin">
          <form onSubmit={handleSubmit} className="logueando">
            <div className="bienvenida">
              Create Account, its easy, its fast.
            </div>
            <br></br>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInput}
              value={registerPayload.name}
              required
            />

            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={registerPayload.lastname}
              onChange={handleInput}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleInput}
              value={registerPayload.email}
              required
            />

            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              name="password"
              onChange={handleInput}
              value={registerPayload.password}
              required
            />
            <div className="bottons form-bottons">
              <br></br>

              <button className="form-bottons">Registrate</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
