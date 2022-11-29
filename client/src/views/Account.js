import React from "react";

function Account() {
  return (
    <div className="background">
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100 mb-4">
        <p className="font-mono font-bold uppercase mb-2">My account</p>
        <p className="font-mono">Name:</p>
        <p className="font-mono">Email:</p>
        <p className="font-mono">Profile picture:</p>
        <form>
          <input type="file" mame="file" id="file" />
          <button className="btn">Upload picture</button>
        </form>
      </div>

      <div className="card mb-4">
        <p className="font-mono font-bold uppercase mb-2">My expeditions</p>
        <p className="font-mono">My favourites:</p>
        <p className="font-mono">My reviews:</p>
      </div>
       
    </div>
  );
}

export default Account;
