import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import getToken from "../utils/getToken";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

function Comments() {
  const { user, server } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const comment = useRef();
  const expeditionName = useParams();
  const singleExpedition = useLocation();

  const getComments = async () => {
    const myHeaders = new Headers();
    const token = getToken();

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const requestOptions = {
      headers: myHeaders,
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${server}/api/expeditions/comments/${expeditionName.island}`,
        requestOptions
      );
      const result = await response.json();
      setComments(result.comments);
    } catch (error) {
      console.log("error", error);
    }
  };

  const postComment = async () => {
    const myHeaders = new Headers();
    const token = getToken();

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("author", user.userName);
    urlencoded.append("profilePicture", user.profilePicture);
    urlencoded.append("text", comment.current.value);
    urlencoded.append("expedition", singleExpedition.state.island);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${server}/api/expeditions/postcomment`,
        requestOptions
      );
      const result = await response.json();
      comment.current.value = "";
      // console.log("result post comments>>", result);
      getComments();
    } catch (error) {
      console.log("error comments>> ", error);
    }
  };

  const deleteComments = async (commentId, commentAuthor) => {
    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("commentId", commentId);
    urlencoded.append("expeditionId", singleExpedition.state._id);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    if (commentAuthor === user.userName) {
      try {
        const response = await fetch(
          `${server}/api/expeditions/deletecomment`,
          requestOptions
        );
        const result = await response.json();
        getComments();
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log("can not delete comments users");
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className="space-y-5">
        <p className="font-mono font-bold uppercase">Travellers opinions</p>
        <textarea
          className="rounded border-2 border-cyan-500 w-full pt-2 pl-2 pr-14 pb-14 font-mono outline-1 outline-cyan-600"
          type="text"
          placeholder="Write your opinion"
          name="opinion"
          ref={comment}
          required
        />
        <label htmlFor="message"></label>
        <br></br>
        <button className="btn" type="submit" onClick={postComment}>
          Submit opinion
        </button>
      </div>{" "}
      {comments?.map((comment, index) => {
        return (
          <div
            key={index}
            className="bg-amber-100 font-mono p-2 rounded-lg mt-4 mb-6 relative"
          >
            <img
              className="w-10 h-10 img-profile"
              src={comment.profilePicture}
              alt="avatar profile"
            />
            <p className="text-sm mb-2">{comment.author} wrote:</p>
            <p className="mb-2 italic">{comment.text}</p>
            <div className="absolute top-0 right-0 mr-2 mt-2">
              {user.userName === comment.author && (
                <button
                  className="btn"
                  type="submit"
                  onClick={() => deleteComments(comment._id, comment.author)}
                >
                  <AiOutlineDelete />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Comments;
