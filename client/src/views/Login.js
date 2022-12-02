import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [userLogin, setUserLogin] = useState({});

  const handleChangeHandler = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const submitLogin = async () => {
    console.log("userLogin", userLogin);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", userLogin.email);
    urlencoded.append("password", userLogin.password);

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
    } catch (error) {
      console.log("error", error);      
    }
  };

  
  return (
    <div className="background">
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100 text-center">
        <p className="font-mono font-bold mb-4">Access to my account</p>
        <div className="flex-col font-mono">
          <label htmlFor="email">Email*</label>
          <br />
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 mb-4 p-1"
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            value={userLogin.email ? userLogin.email : ""}
            onChange={handleChangeHandler}
            required
          />
          <br />

          <label htmlFor="password">Password*</label>
          <br />
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 p-1"
            type="password"
            placeholder="Enter password"
            name="password"
            value={userLogin.password ? userLogin.password : ""}
            onChange={handleChangeHandler}
            required
          />
          <br />
          <p className="font-mono text-xs mb-4">* required fields</p>

          <button className="btn mb-8" onClick={submitLogin}>
            Login
          </button>
          <br />
          <p className="font-mono font-bold mb-2">Not an account yet?</p>
          <Link className="btn mb-10" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
