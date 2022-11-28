import leaderModel from "../models/leadersModel.js"

const getAllLeaders = async (req, res) => {
    try {
        const allLeaders = await leaderModel.find({})

    res.status(200).json({
        number: allLeaders.length,
        allLeaders
    })
    } catch (error) {
        console.log("error getting all leaders >", error);
        res.status(500).json({
            error: error,
            msg: "problem in the server with all leaders",
        })
    }
}
export { getAllLeaders };