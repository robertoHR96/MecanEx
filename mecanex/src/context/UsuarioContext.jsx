import { createContext, useState, useContext } from 'react';

// Crear el contexto
const UsuarioContext = createContext();

// Crear el proveedor del contexto
export const UsuarioProvider = ({ children }) => {
  const [user, setUser] = useState({ infoGame : []});

  const loginUser = (userData) => {
    setUser({ ...userData });
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UsuarioContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// Crear un custom hook para acceder al contexto
export const useUsuarioContext = () => {
  return useContext(UsuarioContext);
};
