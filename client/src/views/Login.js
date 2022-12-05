import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  // const [userLogin, setUserLogin] = useState({})
  const { submitLogin } = useContext(AuthContext);

  const email = useRef()
  const password = useRef()
  // const handleChangeHandler = (e) => {
  //   console.log(
  //     "[e.target.name]:e.target.value",
  //     e.target.name,
  //     e.target.value
  //   );
  //   setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  // };

  const handleSubmit = () => {
    // if (password.current.value.lenght > 5) {
      
    //   submitLogin(email.current.value, password.current.value);
    // } else {
      
    //   alert("password too short")
    // }
    submitLogin(email.current.value, password.current.value);
  
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
            // value={userLogin.email ? userLogin.email : ""}
            // onChange={handleChangeHandler}
            ref = {email}
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
            // value={userLogin.password ? userLogin.password : ""}
            // onChange={handleChangeHandler}
            ref={password}
            required
          />
          <br />
          <p className="font-mono text-xs mb-4">* required fields</p>

          <button className="btn mb-8" onClick={handleSubmit}>
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
