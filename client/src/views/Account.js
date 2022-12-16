import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Account() {
  const { user, setUser, logOut, getProfile, expedition } =
    useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState({});
  // console.log("expedition", expedition);
  // console.log("userFavs", user.favourites);

  const attachFileHandler = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const submitUploadPicture = async (e) => {
    console.log("selectedFile>", selectedFile);
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/uploadimage",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result.image);
      setUser({ ...user, profilePicture: result.image });
    } catch (error) {
      console.log("error >", error);
    }
  };

  const submitLogOut = () => {
    console.log("logout");
    logOut();
  };

  return (
    <div className="background lg:mx-60">
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100 mb-4 text-center object-center">
        <p className="font-mono font-bold uppercase mb-2">
          My {user?.role} account
        </p>
        {user && (
          <div>
            <p className="font-mono">Name: {user.userName}</p>
            <p className="font-mono">Email: {user.email}</p>
          </div>
        )}

        {user && user.profilePicture !== undefined ? (
          <img
            className="w-32 h-32" // centrar esta imagen
            src={user.profilePicture}
            alt="profile picture"
          />
        ) : (
          <img
            className="w-32 h-32" // centrar esta imagen
            src="http://res.cloudinary.com/dtwbyjspa/image/upload/v1669821358/images/yk4xc69svkglrejjq3tk.png"
            alt="default profile picture"
          />
        )}
        <div>
          <label htmlFor="file-upload" className="custom-file-upload">
            Edit picture
          </label>
          <input id="file-upload" type="file" onChange={attachFileHandler} />
          <button className="btn" onClick={submitUploadPicture}>
            Upload picture
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <p className="font-mono font-bold uppercase mb-2">
          My favourites expeditions
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {user?.favourites?.map((fav, index) => {
            return (
              <div className="card mb-4 font-mono" key={index}>
                <p className="mb-1">{fav.island}</p>
                <p className="text-xs mb-1 ">{fav.country}</p>
                <img
                  src={fav.images[0]}
                  alt="expedition image"
                  className="w-32 rounded mb-1"
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* </div> */}

      <button className="btn mb-4" onClick={submitLogOut}>
        Log out
      </button>

      <div className="card mb-4">
        <p className="font-mono font-bold uppercase mb-2">Delete account</p>
        <p className="font-mono"></p>
      </div>
    </div>
  );
}

export default Account;
