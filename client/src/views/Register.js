import React, { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { submitRegister } = useContext(AuthContext);

  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const roleTraveller = useRef();
  const roleLeader = useRef();

  const handleSubmit = () => {
    submitRegister(
      userName.current.value,
      email.current.value,
      password.current.value,
      roleTraveller.current.value,
      roleLeader.current.value
    );
  };

  return (
    <div className="background">
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100 text-center">
        <p className="font-mono font-bold mb-4">Create account</p>
        <div className="flex-col font-mono">
          <label htmlFor="username">Name</label>
          <br />
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 mb-4 p-1"
            id="username"
            type="text"
            placeholder="Enter name"
            name="userName"
            ref={userName}
            required
          />
          <br />

          <label htmlFor="email">Email*</label>
          <br />
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 mb-4 p-1"
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
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 mb-4 p-1"
            type="password"
            placeholder="Enter password"
            name="password"
            ref={password}
            required
          />
          <br />

          <div>
            <p className="font-mono mb-1">Register as*:</p>
            <input
              className="mr-1"
              type="radio"
              id="traveller"
              name="role"
              value="traveller"
              ref={roleTraveller}
            ></input>
            <label htmlFor="traveller">Traveller</label>
            <br />
            <input
              className="mr-1"
              type="radio"
              id="leader"
              name="role"
              value="leader"
              ref={roleLeader}
            ></input>
            <label htmlFor="leader">Leader</label>
          </div>
          <br />

          <p className="font-mono text-xs mb-4">* required fields</p>

          <button className="btn mb-10" onClick={handleSubmit}>
            Register
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Register;
