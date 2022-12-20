import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdModeEditOutline, MdArrowRightAlt } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

import { Link } from "react-router-dom";
function Account() {
  const { user, setUser, logOut, getProfile, expedition, getToken } =
    useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState({});
  const [showInput1, setShowInput1] = useState(false); // JC style
  const userName = useRef();
  // console.log("expedition", expedition);
  // console.log("userFavs", user.favourites);

  const attachFileHandler = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const submitUploadPicture = async (e) => {
    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);

    console.log("selectedFile>", selectedFile);
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/uploadimage",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      updateProfilePic({ img: result.imageUrl });
      // setUser({ ...user, profilePicture: result.image });
    } catch (error) {
      console.log("error >", error);
    }
  };

  const updateProfilePic = async (userUpdates) => {
    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const { img } = userUpdates;
    console.log("img :>> ", img);

    const urlencoded = new URLSearchParams();
    urlencoded.append("imageUrl", img);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/editimage",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);

      setUser({ ...user, profilePicture: result.updatedUser });
    } catch (error) {
      console.log("error >", error);
    }
  };

  const submitUpdate = async () => {
    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    // urlencoded.append("id", user._id);
    // if (userName.current) { urlencoded.append("username", userName.current.value);
    urlencoded.append("newUserName", userName.current.value);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/updateprofile",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setShowInput1(false); // JC style
    } catch (error) {
      console.log("error >", error);
    }
    getProfile(); //tengo que llamar aqui el profile?
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
          <div className="font-mono flex flex-row justify-center items-center">
            <p className="font-mono">Name: </p>
            {!showInput1 ? (
              <p className="font-mono"> {user.userName} </p>
            ) : (
              <input
                className="border-2 rounded border-cyan-500 p-1"
                type="text"
                name="username"
                ref={userName}
                defaultValue={user.userName}
              ></input>
            )}

            {!showInput1 ? (
              <button
                className="btn-reverse"
                type="submit"
                onClick={() => setShowInput1(true)}
              >
                <MdModeEditOutline />
              </button>
            ) : (
              <div>
                <button
                  className="btn"
                  type="submit"
                  onClick={() => submitUpdate()}
                >
                  <GrUpdate />
                </button>
              </div>
            )}
          </div>
        )}
        <p className="font-mono">Email: {user.email}</p>
        {user && user.profilePicture !== undefined ? (
          <img
            className="w-32 h-32 img-profile"
            src={user.profilePicture}
            alt="profile picture"
          />
        ) : (
          <img
            className="w-32 h-32 img-profile"
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

      {/* <div className="card mb-4">
        <p className="font-mono font-bold uppercase mb-2">Delete account</p>
        <p className="font-mono"></p>
      </div> */}
    </div>
  );
}

export default Account;
