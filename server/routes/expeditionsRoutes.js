import express from 'express';
import expeditionModel from '../models/expeditionsModel.js';
const router = express.Router();

router.get('/all', async (req, res) => {
   try {
    const allExpeditions = await expeditionModel.find({});
    console.log("allExpeditions >", allExpeditions);
    res.status(200).json({
        number: allExpeditions.length,
        allExpeditions,
    })
   } catch (error) {
    console.log("error >", error)
   }
  });
  export default router;