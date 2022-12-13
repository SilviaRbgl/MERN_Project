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
  console.log("req :>>", req.params);
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
    const savedComment = await newComment.save();

    if (savedComment) {
      const { _id, comments } = req.expedition;

      const findingExpedition = await expeditionModel.findById({ _id: _id });
      console.log("findingExpedition>>>", findingExpedition);

      if (findingExpedition.comments.includes(comments)) {
        const findingComment = await expeditionModel.findByIdAndUpdate(
          { _id: _id },
          { $push: { comments: comments } },
          { returnOriginal: false }
        );
        res.status(201).json({
          msg: "comment created in expedition",
          comment: findingComment,
        });
      }
    }
    res.status(201).json({
      comment: savedComment,
      msg: "comment created",
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong posting a comment",
      error: error,
    });
  }
};

//Actualizar el array de commentarios de la expedicion haciendo push en el array con el postedComment._id.

export { gettAllExpeditions, getExpeditionsByLeader, createComment };
