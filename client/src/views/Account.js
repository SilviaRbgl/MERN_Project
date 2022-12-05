import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Account() {
  const { user, newUser, setNewUser, getToken, setIsUser, logOut } =
    useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState({});
  const [userLogin, setUserLogin] = useState({});

  const getProfile = async () => {
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setUserLogin(result);
    } catch (error) {
      console.log("error >", error);
    }
  };

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
      console.log("result", result);
      setNewUser({ ...newUser, profilePicture: result.image });
    } catch (error) {
      console.log("error >", error);
    }
  };

  const submitLogOut = () => {
    console.log("logout");
    logOut();
  };

  return (
    <div className="background">
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100 mb-4">
        <p className="font-mono font-bold uppercase mb-2">
          My {userLogin?.role} account
        </p>
        {userLogin && (
          <div>
            <p className="font-mono">Name:{user.userName}</p>
            <p className="font-mono">Email: {user.email}</p>
          </div>
        )}

        {/* <p className="font-mono">Profile picture:</p> */}
        {newUser && (
          <img
            className="w-32 h-32"
            src={
              newUser.profilePicture
                ? newUser.profilePicture
                : "http://res.cloudinary.com/dtwbyjspa/image/upload/v1669821358/images/yk4xc69svkglrejjq3tk.png"
            }
            alt="profile picture"
          />
        )}
        {/* <img className="w-32 h-32" src="http://res.cloudinary.com/dtwbyjspa/image/upload/v1669821358/images/yk4xc69svkglrejjq3tk.png" alt="profile picture" /> */}
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
        <p className="font-mono font-bold uppercase mb-2">My expeditions</p>
        <p className="font-mono">My favourites:</p>
        <p className="font-mono">My reviews:</p>
      </div>
      <button className="btn" onClick={submitLogOut}>
        Log out
      </button>
    </div>
  );
}

export default Account;
