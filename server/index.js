const express = require("express");
const app = express();
var router = express.Router();
var cookieParser = require('cookie-parser');


router.use((req,res,next) => {
    console.log("middleware work");
    next();    
})



app.use(cookieParser());
app.use('/user',router);
app.use(express.static('Data')); // hỗ trợ truy cập vào thư mục Data từ client
app.use((req, res, next) => {   // hỗ trợ nhận request post dạng json từ client
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});
app.listen(3000,function(){
    console.log("server dang chay"); 
});
var control = require("./Control/control.js");
control.route(app); // truyền cho control điều khiển


app.get('/f',(req,res)=>{
    res.cookie('cookie_name' , 'cookie_value').send('Cookie is set');
})







var data_control = require('./Control/data_control');
data_control.route(app); 

