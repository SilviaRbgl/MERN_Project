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
  // console.log("leader", leader);
  try {
    const requestedExpeditions = await expeditionModel
      .findOne({ leader: leader })
      .exec();
    // console.log("requestedExpeditions>>>", requestedExpeditions);
    res.status(200).json({
      number: requestedExpeditions.length,
      requestedExpeditions,
    });
  } catch (error) {
    console.log("error getting expeditions by leader >", error);
    res.status(500).json({
      error,
      msg: "problem in the server getting expeditions by leaders",
    });
  }
};

const getExpeditionsByName = async (req, res) => {
  const { expedition } = req.params;
  // console.log("req.params", req.params);
  try {
    const requestedExpedition = await expeditionModel
      .findOne({
        island: expedition,
      })
      .populate({ path: "comments" })
      .exec();
    console.log("requestedExpedition", requestedExpedition.comments);
    res.status(200).json({
      msg: "comments by name of expedition successfully",
      comments: requestedExpedition.comments,
    });
  } catch (error) {
    console.log("error getting expeditions by name >", error);
    res.status(500).json({
      error,
      msg: "problem in the server getting comments by name of expedition",
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
          {
            island: expedition,
            author: author,
            text: text,
          },
          { $push: { comments: savedComment } },
          {
            returnOriginal: false,
          }
        );
        res.status(201).json({
          msg: "comment saved",
          // comment: {
          //   author: findingComment.author,
          //   text: findingComment.text,
          //   island: findingComment.expedition,
          // },
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
  const { expeditionId, commentId } = req.body;
  console.log("expeditionId :>> ", expeditionId);
  console.log("commentId :>> ", commentId);

  try {
    const deleteCommentDb = await commentModel.findByIdAndDelete({
      _id: commentId,
    });

    console.log("deleteCommentDb>>", deleteCommentDb);

    if (deleteCommentDb) {
      const deleteCommentExpArray = await expeditionModel.findByIdAndUpdate(
        { _id: expeditionId }, // id de la expedición
        { $pull: { comments: commentId } },
        {
          returnOriginal: false,
        }
      );
      console.log("deleteCommentExpArray :>> ", deleteCommentExpArray);
      res.status(201).json({
        msg: "comment removed from db & array",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "problem deleting message",
    });
  }
};

export {
  gettAllExpeditions,
  getExpeditionsByLeader,
  getExpeditionsByName,
  createComment,
  deleteComment,
};
