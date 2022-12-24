import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Grid from "../components/Grid";
import { useSearchContext } from "../context/SearchContext";

export default function UsersContent() {
  const { searchText, setSearchText } = useSearchContext();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState(null);
  useEffect(() => {
    setSearchText(null);
    axios.get("/api/users").then((usuarios) => setUsuarios(usuarios.data));
  }, []);

  if (searchText) navigate("/search");
  return (
    <>
      <div>
        <h1>Usuarios:</h1>
      </div>
      <div>
        <Grid listMovies={usuarios} />
      </div>
    </>
  );
}
