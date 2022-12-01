import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [newUser, setNewUser] = useState({});

  return (
    <AuthContext.Provider value={{ newUser, setNewUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
