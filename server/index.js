const express = require("express");
const app = express();
app.use(express.static('Data'));
app.listen(3000,function(){
    console.log("server dang chay"); 
});
var control = require("./Control/control.js");
control.route(app);

