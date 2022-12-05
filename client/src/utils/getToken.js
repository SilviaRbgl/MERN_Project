const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("getToken run");
  if (token) {
    console.log("user is logged in");
    return token
  } else {
    console.log("user is NOT logged in");
    return false;
  }
};

export default getToken;