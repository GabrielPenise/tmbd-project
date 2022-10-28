import { createContext, useState, useContext } from "react";

export const SearchContext = createContext();

export function SearchContextProvider({ children }) {
  const [searchText, setSearchText] = useState(null);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("No hay contexto para search");
  return context;
};
