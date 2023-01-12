import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { submitLogin } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  const handleSubmit = () => {
    submitLogin(email.current.value, password.current.value);
  };

  return (
    <div className="background">
      <div className="card-login">
        <p className="font-mono font-bold mb-4">Access to my account</p>
        <div className="flex-col font-mono pb-8">
          <label htmlFor="email">Email*</label>
          <br />
          <input
            className="input"
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            ref={email}
            required
          />
          <br />

          <label htmlFor="password">Password*</label>
          <br />
          <input
            className="input"
            type="password"
            placeholder="Enter password"
            name="password"
            ref={password}
            required
          />
          <br />
          <p className="font-mono text-xs mb-4">* required fields</p>

          <button className="btn mb-8" onClick={handleSubmit}>
            Login
          </button>
          <br />
          <p className="font-mono font-bold mb-3">Not an account yet?</p>
          <Link className="btn" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
