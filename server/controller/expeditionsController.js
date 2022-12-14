import commentModel from "../models/commentsModel.js";
import expeditionModel from "../models/expeditionsModel.js";

const gettAllExpeditions = async (req, res) => {
  try {
    const allExpeditions = await expeditionModel
      .find({})
      .populate({ path: "leader" })
      .populate({ path: "comments" })
      .exec();
    // console.log("allExpeditions >", allExpeditions);
    res.status(200).json({
      number: allExpeditions.length,
      allExpeditions,
    });
  } catch (error) {
    console.log("error getting all expeditions >", error);
    res.status(500).json({
      error,
      msg: "problem in the server with all expeditions",
    });
  }
};

const getExpeditionsByLeader = async (req, res) => {
  // console.log("req :>>", req.params);
  const { leader } = req.params;
  try {
    const requestedExpeditions = await expeditionModel
      .find({ leader: leader })
      .exec();
    console.log("requestedExpeditions>>>", requestedExpeditions);
    res.status(200).json({
      number: requestedExpeditions.length,
      requestedExpeditions,
    });
  } catch (error) {
    console.log("error getting expeditions by leader >", error);
    res.status(500).json({
      error,
      msg: "problem in the server getting leaders",
    });
  }
};

// crear comentario en collecion comments
const createComment = async (req, res) => {
  const { author, date, text, expedition } = req.body;
  console.log("req.body comment>>>", req.body);

  try {
    const newComment = new commentModel({
      author: author,
      // date: date,
      text: text,
      expedition: expedition,
    });
    console.log("newComment", newComment);
    const savedComment = await newComment.save();

    console.log("savedComment", savedComment);
    if (savedComment) {
      try {
        const findingComment = await expeditionModel.findOneAndUpdate(
          { island: expedition },
          { $push: { comments: savedComment } },
          {
            returnOriginal: false,
          }
        );
        res.status(201).json({
          msg: "comment saved",
          findingComment,
        });
      } catch (error) {
        res.status(500).json({
          msg: "couldn't save message into expeditions array",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "problem adding message",
    });
  }
};

const deleteComment = async (req, res) => {
  const { expedition, id } = req.body;

  try {
    const deleteCommentDb = await commentModel.findByIdAndDelete({
      _id: id,
    });
    res.status(201).json({
      msg: "comment removed from database",
      comment: {
        id: deleteCommentDb._id,
      },
    });

    const deleteCommentExp = await commentModel.findOneAndUpdate(
      { island: expedition }, // name de la expedición
      { $pull: { comments: deleteCommentExp.island } },
      {
        returnOriginal: false,
      }
    );
    res.status(201).json({
      msg: "comment removed",
      comments: {
        id: deleteCommentExp.island,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "problem deleting message",
    });
  }
};

export {
  gettAllExpeditions,
  getExpeditionsByLeader,
  createComment,
  deleteComment,
};
