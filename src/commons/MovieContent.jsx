import { useState, useEffect } from "react";

import { get, getSearch } from "../utils/pedidos";
import { useSearchContext } from "../context/SearchContext";
import MovieGrid from "../components/MovieGrid";

export default function MovieContent() {
  const [listMovies, setListMovies] = useState(undefined);
  const { searchText } = useSearchContext();

  useEffect(() => {
    !searchText
      ? get("/trending/all/day").then((movies) => setListMovies(movies.results))
      : getSearch(searchText).then((movies) => {
          setListMovies(movies.results);
        });
  }, [searchText]);
  if (!listMovies) return <div>Still Loading</div>;

  return <MovieGrid listMovies={listMovies} />;
}
