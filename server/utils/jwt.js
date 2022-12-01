import JsonWebToken from "jsonwebtoken";

const issueToken = async (userId) => {
  const payload = {
    sub: userId,
  };
  const options = {
    expiresIn: "5 days",
  };

  const token = await JsonWebToken.sign(
    payload,
    process.env.JWT_SECRET,
    options
  );

  return token;
};

export default issueToken;
