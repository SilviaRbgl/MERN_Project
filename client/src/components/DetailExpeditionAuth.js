import { useLocation, useParams } from "react-router-dom";
import { MdFavoriteBorder, MdClose } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Carousel } from "flowbite-react";
import getToken from "../utils/getToken";

function DetailExpeditionAuth() {
  const singleExpedition = useLocation();
  const { user, setUser, getProfile } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const comment = useRef();
  const [comments, setComments] = useState([]);
  // console.log("singleExpedition>>", singleExpedition.state);

  const expeditionName = useParams();
  // console.log("expeditionName", expeditionName);

  const getDates = (date) => {
    let myDate = new Date(date).toLocaleDateString();
    return myDate;
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const addOrDeleteFav = async (expeditionId) => {
    // console.log("espedition ID in addOrDetele :>> ", expeditionId);
    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("favourite", expeditionId); // esto va al backend

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/favourites",
        requestOptions
      );
      const result = await response.json();
      // console.log("result", result);
      getProfile();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const isFav = (expeditionID) => {
    console.log("expeditionId :>> ", expeditionID);
    console.log("user.favourites :>> ", user.favourites);
    if (
      user?.favourites?.length > 0 &&
      user?.favourites?.find((fav) => fav._id === expeditionID)
    ) {
      return true;
    }
    return false;
  };

  const postComment = async () => {
    const myHeaders = new Headers();
    const token = getToken();

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("author", user.email);
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
        "http://localhost:5000/api/expeditions/postcomment",
        requestOptions
      );
      const result = await response.json();
      comment.current.value = "";
      // console.log("result comments>>", result);
      updateComments();
    } catch (error) {
      console.log("error comments>> ", error);
    }
  };

  const updateComments = async () => {
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
        `http://localhost:5000/api/expeditions/comments/${expeditionName.island}`,
        requestOptions
      );
      const result = await response.json();
      // console.log("result comments>>", result.comments);
      setComments(result.comments);
    } catch (error) {
      console.log("error", error);
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
    if (commentAuthor === user.email) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/expeditions/deletecomment",
          requestOptions
        );
        const result = await response.json();
        console.log("resultDelete", result);
        updateComments();
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log("can not delete comments users");
    }
  };

  // const isDeleted = (commentId) => {
  //   if (user?.comments?.length > 0 && user?.comments?.includes(commentId)) {
  //     return true;
  //   }
  // };

  useEffect(() => {
    updateComments();
  }, []);

  return (
    <>
      <div className="card mb-4">
        <div className="saturate-50 mb-4 h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={3000}>
            <img
              src={
                singleExpedition.state?.images &&
                singleExpedition.state.images[0]
              }
              alt="expedition image"
            />
            <img
              src={
                singleExpedition.state?.images &&
                singleExpedition.state.images[1]
              }
              alt="expedition image"
            />
            <img
              src={
                singleExpedition.state?.images &&
                singleExpedition.state.images[2]
              }
              alt="expedition image"
            />
          </Carousel>
        </div>

        <p className="font-mono font-bold">
          {singleExpedition.state.island}, {singleExpedition.state.country}
        </p>
        <p className="font-mono">Dates:</p>
        <p className="font-mono">
          {getDates(singleExpedition.state.date.beginDate)} -{" "}
          {getDates(singleExpedition.state.date.endDate)}
        </p>
        <p className="font-mono">
          Leader: {singleExpedition.state.leader.name}
        </p>
        <p className="font-mono">Price: {singleExpedition.state.price}</p>
        <p className="font-mono"></p>
        {}
        <button
          onClick={() => addOrDeleteFav(singleExpedition.state._id)}
          className={
            isFav(singleExpedition.state._id)
              ? "btn-favorite-clicked"
              : "btn-favorite"
          }
        >
          {console.log("isFavorite>>>", isFav(singleExpedition.state._id))}
          <MdFavoriteBorder />
        </button>
        <br />
        <button className="btn" onClick={toggleModal}>
          Reserve
        </button>
        {modal && (
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
              <p className="font-mono font-bold text-center">HURRAH!</p>
              <p className="font-mono text-center">
                Thanks for the interest in this expedition. You will receive an
                email with all the details for the reservation!
              </p>
              <button className="close-modal" onClick={toggleModal}>
                <MdClose />
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="font-mono font-bold uppercase mb-2">Itinerary</p>
      <p className="font-mono mb-10">{singleExpedition.state.itinerary}</p>
      <p className="font-mono font-bold uppercase mb-2">What is included</p>
      <p className="font-mono mb-10">{singleExpedition.state.itinerary}</p>

      <div className="container-comment" action="">
        <p className="font-mono font-bold uppercase mb-2">
          Travellers opinions
        </p>
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
        <button className="btn mb-4" type="submit" onClick={postComment}>
          Submit opinion
        </button>
      </div>
      {comments?.map((comment, index) => {
        return (
          <div
            key={index}
            className="bg-amber-100 font-mono p-2 rounded-lg mb-6 relative"
          >
            <p className="text-sm mb-2">{comment.author} wrote:</p>
            <p className="mb-2">"{comment.text}"</p>
            <div
              className="absolute top-0 right-0 mr-2 mt-2"
              // className={
              //   isDeleted(comment)
              //     ? "absolute top-0 right-0 mr-2 mt-2"
              //     : "absolute top-0 right-0 mr-2 mt-2 hidden"
              // }
            >
              <button
                className="btn"
                type="submit"
                onClick={() => deleteComments(comment._id, comment.author)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DetailExpeditionAuth;
