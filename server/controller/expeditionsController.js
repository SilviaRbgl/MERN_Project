import commentModel from "../models/commentsModel.js";
import expeditionModel from "../models/expeditionsModel.js";

const gettAllExpeditions = async (req, res) => {
  try {
    const allExpeditions = await expeditionModel
      .find({})
      .populate({ path: "leader" })
      .populate({ path: "comments" })
      .exec();
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
  const { leader } = req.params;
  try {
    const requestedExpeditions = await expeditionModel
      .findOne({ leader: leader })
      .exec();
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
  try {
    const requestedExpedition = await expeditionModel
      .findOne({
        island: expedition,
      })
      .populate({ path: "comments" })
      .exec();
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

const createComment = async (req, res) => {
  const { author, profilePicture, text, expedition } = req.body;

  try {
    const newComment = new commentModel({
      author: author,
      profilePicture: profilePicture,
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
            profilePicture: profilePicture,
            text: text,
          },
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
  const { expeditionId, commentId } = req.body;

  try {
    const deleteCommentDb = await commentModel.findByIdAndDelete({
      _id: commentId,
    });

    if (deleteCommentDb) {
      const deleteCommentExpArray = await expeditionModel.findByIdAndUpdate(
        { _id: expeditionId },
        { $pull: { comments: commentId } },
        {
          returnOriginal: false,
        }
      );
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
