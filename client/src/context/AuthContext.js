import { createContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import getToken from "../utils/getToken.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUser, setIsUser] = useState(true);
  const [user, setUser] = useState(null);
  const [expedition, setExpedition] = useState([]);
  const [loading, setLoading] = useState(true);
  const redirectTo = useNavigate();

  const submitRegister = async (
    userName,
    email,
    password,
    role,
    profilePicture
  ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", userName ? userName : email);
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
    // console.log("userLogin", email, password);

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
      // console.log("result", result);
      // console.log("result", result.token);
      const { user } = result;
      // setLoading(false);
      setUser(user);
      const { token } = result;
      if (token) {
        localStorage.setItem("token", token);
        setIsUser(true);
        setUser(result.user);
        redirectTo("/expeditions");
      }
      if (!token || !user) {
        setUser(null);
        setIsUser(false);
        // alert("user not found with this email, register first?");
      }
    } catch (error) {
      setIsUser(false);
      setUser(null);
      // setLoading(false);
      console.log("error", error);
    }
  };

  const getProfile = async () => {
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (token) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          requestOptions
        );
        const result = await response.json();
        console.log("result", result);
        setUser(result);
        setIsUser(true);
      } catch (error) {
        console.log("error >", error);
        setUser(null);
        setIsUser(false);
      }
    } else {
      // alert("sesion expired, please log in again");
      // redirectTo("/login");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setIsUser(false);
    setUser(null);
    redirectTo("/");
  };

  useEffect(() => {
    console.log("useEffect run");
    getToken();
    console.log("isUser :>> ", isUser);
    getProfile();
  }, [isUser]);

  return (
    <AuthContext.Provider
      value={{
        getToken,
        isUser,
        setIsUser,
        submitRegister,
        submitLogin,
        logOut,
        user,
        setUser,
        getProfile,
        loading,
        setLoading,
        expedition,
        setExpedition,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
