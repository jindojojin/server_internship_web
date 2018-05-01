const express = require("express");
const app = express();
var router = express.Router();
cookieParser = require('cookie-parser')
app.use((req, res, next) => {   // hỗ trợ nhận request post dạng json từ client
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  next();
});
app.use(cookieParser());

// set a cookie
app.use('/',function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.usertoken;
  if (cookie === undefined)
  {
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});




app.use('/user',router);
app.use(express.static('Data')); // hỗ trợ truy cập vào thư mục Data từ client

app.listen(3000,function(){
    console.log("server dang chay"); 
});
var control = require("./Control/control.js");
control.route(app); // truyền cho control điều khiển

var data_control = require('./Control/data_control');
data_control.route(app); 

