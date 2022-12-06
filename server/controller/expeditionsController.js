import expeditionModel from "../models/expeditionsModel.js";

const gettAllExpeditions = async (req, res) => {
    try {
      const allExpeditions = await expeditionModel.find({}).populate({ path: "leader"});
      console.log("allExpeditions >", allExpeditions);
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
        .exec()
    console.log("requestedExpeditions>>>", requestedExpeditions);
    res.status(200).json({
        number: requestedExpeditions.length,
        requestedExpeditions,
    })
    } catch (error) {
      console.log("error getting expeditions by leader >", error);
      res.status(500).json({
        error,
        msg: "problem in the server getting leaders"
      });
    }  
  };

  export { gettAllExpeditions, getExpeditionsByLeader }
