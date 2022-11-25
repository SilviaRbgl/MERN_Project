import React from 'react'

function Register() {
  return (
    <div className="background">
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100 text-center">
        <p className="font-mono font-bold mb-4">Create account</p>
        <div className="flex-col font-mono">
        <label htmlFor="name">Name</label><br/>
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 mb-4 p-1"
            type="text"
            placeholder="Enter name"
            name="name" required /><br/>

          <label htmlFor="email">Email*</label><br/>
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 mb-4 p-1"
            type="email"
            placeholder="Enter email"
            name="email" required /><br/>

          <label htmlFor="password">Password*</label><br/>
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 mb-4 p-1"
            type="password"
            placeholder="Enter password"
            name="password"
            required
          /><br/>
                    <label htmlFor="password">Confirm password*</label><br/>
          <input
            className="border-2 rounded border-cyan-500 shadow-md shadow-cyan-400/30 p-1"
            type="password"
            placeholder="Enter password"
            name="password"
            required
          /><br/>
           <p className="font-mono text-xs mb-4">* required fields</p>

          <button className="btn mb-10">Login</button><br/>
        </div>
      </div>
    </div>
  )
}

export default Register