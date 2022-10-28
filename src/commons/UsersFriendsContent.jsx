import axios from "axios";
import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { useAuthContext } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router";

export default function UsersFriendsContent() {
  const { searchText, setSearchText } = useSearchContext();
  const navigate = useNavigate();
  const [amigosArr, setAmigosArr] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    setSearchText(null);
    axios
      .get("/api/users/findOne", {
        params: {
          ...user,
        },
      })
      .then((usuarios) => {
        const arregloUsuarios = usuarios.data.amigos.map((usuario) => {
          return JSON.parse(usuario);
        });
        setAmigosArr(arregloUsuarios);
      });
  }, []);
  if (searchText) navigate("/search");
  return (
    <>
      <div>
        <h1>Amigos :</h1>
      </div>

      <div>
        <MovieGrid listMovies={amigosArr} />{" "}
      </div>
    </>
  );
}
