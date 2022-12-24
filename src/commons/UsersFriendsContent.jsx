import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "../components/Grid";
import { useAuthContext } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router";

export default function UsersFriendsContent() {
  const { setSearchText } = useSearchContext();

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

  return (
    <>
      <div>
        <h1>Amigos :</h1>
      </div>

      <div>
        <Grid listMovies={amigosArr} />{" "}
      </div>
    </>
  );
}
