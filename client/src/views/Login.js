import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="background">
      <div className="card bg-gradient-to-r from-amber-200 to-cyan-200 text-center">
        <p className="font-mono font-bold mb-4">Access to my account</p>
        <div class="flex-col font-mono">
          <label htmlFor="email">Email*</label><br/>
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 mb-4 p-1"
            type="email"
            placeholder="Enter email"
            name="email" required /><br/>

          <label htmlFor="password">Password*</label><br/>
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 p-1"
            type="password"
            placeholder="Enter password"
            name="password"
            required
          /><br/>
           <p className="font-mono text-xs mb-4">* required fields</p>

          <button className="mb-10">Login</button><br/>
          <p className="font-mono font-bold">Not an account yet?</p>
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
