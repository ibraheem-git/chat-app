const Msg = require('../model/message');

const createMsg = async (req, res) => {
    const {text} = req.body;
    if(!text) {
        return res.status(500).json({message: 'write a message'})
    }
    const newText =  {text}
    try {
        await Msg.create(newText)
        return res.status(200).json({ success: true, message: "message created", text });

    } catch (error) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

const getAllMsgs = async (req, res) => {
    try {
      const allMsg = await Msg.find({});
        return res.status(200).send({success: true, message: 'messages retrieved'})
    } catch (err) {
        res.json(err)
    }
}


module.exports = {
    createMsg,
    getAllMsgs
} 