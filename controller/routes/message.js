const express = require('express');
const { getAllMsgs } = require('../controller/message');
const router = express.Router();

router.post('/messsage', (req, res) => {
    res.send('Hi')
   });

router.get('/getMsg', getAllMsgs)


module.exports = router