import React from "react";
import { useNavigate } from "react-router";

import { useSearchContext } from "../context/SearchContext";

export default function SearchText() {
  const { searchText, setSearchText } = useSearchContext();
  const navigate = useNavigate();

  const handlerInput = (e) => {
    setSearchText(e.target.value);
    navigate("/search");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={handlerInput}
          value={searchText}
          placeholder="Search..."
        />
      </form>
    </div>
  );
}
