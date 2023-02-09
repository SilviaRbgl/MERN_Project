import React, { useContext } from "react";
import getToken from "../utils/getToken";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";

function Favourite() {
  const { user, getProfile, server } = useContext(AuthContext);
  const singleExpedition = useLocation();

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

  return (
    <div>
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
    </div>
  );
}

export default Favourite;
