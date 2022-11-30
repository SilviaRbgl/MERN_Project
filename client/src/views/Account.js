import React, { useState } from "react";

function Account() {
  const [selectedFile, setSelectedFile] = useState({});
  const [newUser, setNewUser] = useState({});

  const attachFileHandler = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const submitUploadPicture = async (e) => {
    console.log("selectedFile>", selectedFile);
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", setSelectedFile);

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
      // setNewUser({ ...newUser, avatarPicture: result.image });
    } catch (error) {
    console.log("error >", error);
    }
  };

  return (
    <div className="background">
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100 mb-4">
        <p className="font-mono font-bold uppercase mb-2">My account</p>
        <p className="font-mono">Name:</p>
        <p className="font-mono">Email:</p>
        <p className="font-mono">Profile picture:</p>
        <form>
          <input type="file" onChange={attachFileHandler} />
          <button className="btn" onClick={submitUploadPicture}>
            Upload picture
          </button>
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
