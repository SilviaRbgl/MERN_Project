import { useLocation, useParams } from "react-router-dom";
import { MdFavoriteBorder, MdClose } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Carousel } from "flowbite-react";
import getToken from "../utils/getToken";

function DetailExpeditionAuth() {
  const singleExpedition = useLocation();
  const { user, getProfile, server } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const comment = useRef();
  const [comments, setComments] = useState([]);
  const expeditionName = useParams();

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
    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("favourite", expeditionId);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${server}/api/users/favourites`,
        requestOptions
      );
      const result = await response.json();
      getProfile();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const isFav = (expeditionID) => {
    if (
      user?.favourites?.length > 0 &&
      user?.favourites?.find((fav) => fav._id === expeditionID)
    ) {
      return true;
    }
    return false;
  };

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
      <div className="card space-y-1 mb-10">
        <div className="saturate-50 mb-4 h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={3000}>
            <img
              src={
                singleExpedition.state?.images &&
                singleExpedition.state.images[0]
              }
              alt="island"
            />
            <img
              src={
                singleExpedition.state?.images &&
                singleExpedition.state.images[1]
              }
              alt="island"
            />
            <img
              src={
                singleExpedition.state?.images &&
                singleExpedition.state.images[2]
              }
              alt="island"
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
          Leader: {singleExpedition.state.leader[0].name}
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
                Thank you for your interest in this expedition, you will receive
                an email with all the booking details!
              </p>
              <button className="modal-close" onClick={toggleModal}>
                <MdClose />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-5">
        <p className="font-mono font-bold uppercase">Itinerary</p>
        <p className="font-mono">{singleExpedition.state.itinerary}</p>
        <p className="font-mono font-bold uppercase">What is included</p>
        <p className="font-mono">{singleExpedition.state.itinerary}</p>
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
      </div>
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

export default DetailExpeditionAuth;
