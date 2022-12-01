import JsonWebToken from "jsonwebtoken";

const issueToken = (userId) => {
  const payload = {
    sub: userId,
  };
  const options = {
    expiresIn: "5 days",
  };

  const token = JsonWebToken.sign(
    payload,
    process.env.JWT_SECRET,
    options
  );

  return token;
};

export default issueToken;
