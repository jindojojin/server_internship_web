const express = require("express");
const app = express();

app.use((req, res, next) => {   // hỗ trợ nhận request post/get chứa cookie dạng json từ client
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  next();
});


cookieParser = require('cookie-parser')
app.use(cookieParser());  // hộ trợ đọc cookie từ client


// //////////////////cài đặt bảo mật

// //yêu cầu là người dùng
// var user_require = express.Router();
// user_require.use((req, res, next) => {
//   userToken = req.cookies.userToken;
//   if (userToken != null) {
//     let user = require('./Model/secure').verifyUserToken(userToken);
//     if (user != null) {
//       console.log("dã xác thực người dùng thành công");
//       next();
//     }
//     else { res.status(401); res.send("Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại") };
//   }
//   else {
//     console.log("không phải là người dùng");
//     res.status(401)
//     res.send("Không xác thực được người dùng, vui lòng gửi cookie kèm request");
//   }
// })
// app.use('/user', user_require);

// //yêu cầu là student
// const student_require = express.Router();
// student_require.use((req,res,next)=>{
//   userToken = req.cookies.userToken;
//   if(userToken != null){    
//     let user = require('./Model/secure').verifyUserToken(userToken);
//     if(user.type == 'student') next();
//    else { res.status(401); res.send("Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại") };;    
//   }
//   else{
//     console.log("không phải là người dùng");
//     res.status(401)
//    res.send("Không xác thực được người dùng, vui lòng gửi cookie kèm request");
//   }
// })
// app.use('/student',student_require);

// //yêu cầu là lecturer
// const lecturer_require = express.Router();
// lecturer_require.use((req,res,next)=>{
//   userToken = req.cookies.userToken;
//   if(userToken != null){    
//     let user = require('./Model/secure').verifyUserToken(userToken);
//     if(user.type == 'lecturer') next();
//   else { res.status(401); res.send("Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại") };
//   }
//   else{
// console.log("không phải là người dùng");
// res.status(401)
// res.send("Không xác thực được người dùng, vui lòng gửi cookie kèm request");
//   }
// })
// app.use('/lecturer',lecturer_require);

// //yêu cầu là admin
// const admin_require = express.Router();
// admin_require.use((req,res,next)=>{
//   userToken = req.cookies.userToken;
//   if(userToken != null){    
//     let user = require('./Model/secure').verifyUserToken(userToken);
//     if(user.type == 'admin') next();
//   else { res.status(401); res.send("Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại") };
//   }
//   else{
// console.log("không phải là người dùng");
// res.status(401)
// res.send("Không xác thực được người dùng, vui lòng gửi cookie kèm request");
//   }
// })
// app.use('/admin',admin_require);

// //yêu cầu là partner
// const partner_require = express.Router();
// partner_require.use((req,res,next)=>{
//   userToken = req.cookies.userToken;
//   if(userToken != null){    
//     let user = require('./Model/secure').verifyUserToken(userToken);
//     if(user.type == 'partner') next();
//   else { res.status(401); res.send("Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại") };
//   }
//   else{
// console.log("không phải là người dùng");
// res.status(401)
// res.send("Không xác thực được người dùng, vui lòng gửi cookie kèm request");
//   }
// })
// app.use('/partner',partner_require);






app.use(express.static('Data')); // hỗ trợ truy cập vào thư mục Data từ client



/// luồng api chính
var control = require("./Control/control.js");
control.route(app); // truyền cho control điều khiển

var data_control = require('./Control/data_control');
data_control.route(app);



app.listen(3000, function () {
  console.log("server dang chay");
});

