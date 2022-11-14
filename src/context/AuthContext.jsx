import React, { useContext, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

//AuthContextProvider pasa las props en index
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//Con useAuthContext podes ingresar directamente a las props, si existe el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No hay contexto para usuario");
  return context;
};
