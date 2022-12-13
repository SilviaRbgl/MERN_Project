import commentModel from "../models/commentsModel.js";

const getAllComments = async (req, res) => {
  try {
    const allComments = await commentModel.find({});
    console.log("allComments >", allComments);
    res.status(200).json({
      number: allComments.length,
      allComments,
    });
  } catch (error) {
    console.log("error getting all comments >", error);
    res.status(500).json({
      error,
      msg: "problem in the server with all comments",
    });
  }
};

export { getAllComments };
