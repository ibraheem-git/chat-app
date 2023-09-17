const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const expressLayouts = require('express-ejs-layouts')
const router = require('./routes/userRoute')
const router1 = require('./routes/message')
const mongoose = require('mongoose');
const User = require('./model/user')
const Msg = require('./model/message')
const server = http.createServer(app);
const socket = require('./socket')


app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(expressLayouts)

//Router middlewares
app.use('/', router);
app.use('/', router1);



const logger = (req, res, next) => {
  console.log('middleware running');
  next();
};

app.get('/register', (req, res) => {
    res.render('register');
  });
  
app.get('/login', (req, res) => {
  const { error } = req.query;
   res.render('login', {
    error
   });
 });  

app.get('/', (req, res) => {
  const { username, name } = req.query;
  if(!username || !name) {
    return res.status(400).send('User must be authenticated');
  }
  return res.render('index', {
    username,
    name
  })
})

//Connection to Db
mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(() => {
  console.log('Connected to db successfully');
})
.catch(err => {
  console.log(err)
  throw new Error('Unabe to connect to db')
})
  
socket(server);

server.listen(4000, () => {
  console.log('listening on *:4000');
});

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//   const password = 'Red12345'
//   const hashedPassword = await bcrypt.hash(password, 8)

//   console.log(password)
//   console.log(hashedPassword)

//   const isMacth = await bcrypt.compare('Red12345', hashedPassword)
//   console.log(isMacth)
// }

// myFunction()