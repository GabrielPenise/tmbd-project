import axios from "axios";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import SearchText from "./SearchText";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const handlerLogOut = (e) => {
    axios.post("/api/users/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="header-top">
      <div className="content">
        <div className="nav">
          {user ? (
            <>
              <div className="nav-wrapper">
                <button className="form-botton" onClick={handlerLogOut}>
                  Logout
                </button>
                <Link to={`/${user.name}${user.lastname}`}>
                  <button className="form-botton">User Profile</button>
                </Link>
              </div>
              <Link to={`/${user.name}${user.lastname}`} className="link-nav">
                <div className="log-tool">Welcome {user.name}</div>
              </Link>
              <div className="search">
                Search
                <SearchText />
              </div>
            </>
          ) : (
            <div>
              <Link to="/">
                <button className="form-botton">Sing In</button>
              </Link>
              <Link to="/register">
                <button className="form-botton">Sing Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
