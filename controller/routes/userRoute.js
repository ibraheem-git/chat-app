const express = require('express');
const router = express.Router();
const msgRoute = require('./message')
const {
       signUp,
       login,
       getAllUsers,
       deleteUser
     } = require('../controller/user');

const {
  createMsg
} = require('../controller/message')

router.post('/signUp', signUp)
router.post('/login', login)
router.get('/getUsers', getAllUsers)
router.delete('/deleteUser', deleteUser)
router.post('/message', createMsg)

module.exports = router;

