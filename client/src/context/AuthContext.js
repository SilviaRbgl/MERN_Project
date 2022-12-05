import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {

  const [isUser, setIsUser] = useState(true);
  const redirectTo = useNavigate();

  const submitRegister = async (userName, email, password, role, profilePicture) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append(
      "userName",
      userName ? userName : email
    );
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append("role", role);
    urlencoded.append(
      "profilePicture",
      profilePicture
        ? profilePicture
        : "http://res.cloudinary.com/dtwbyjspa/image/upload/v1669821358/images/yk4xc69svkglrejjq3tk.png"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      redirectTo("/login"); 
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitLogin = async (email, password) => {
    console.log("userLogin", email, password);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
        );
      const result = await response.json();
      console.log("result", result);
      const {token} = result
      if(token) {
        localStorage.setItem("token", token);
      }
      redirectTo("/expeditions");
    } catch (error) {
      console.log("error", error);      
    }
  };

  useEffect(() => {
    console.log("useEffect run");
    getToken();
  }, [isUser]);

  return (
    <AuthContext.Provider
      value={{
        getToken,
        setIsUser, 
        submitRegister,
        submitLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
