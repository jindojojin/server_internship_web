const user = require('../Model/userModel');
module.exports = {
    validate_user: function(req,res){
        console.log("da nhận 1 yêu cầu validate");
        let username = req.body.username;
        let password = req.body.userpassword;
        console.log(password);
        console.log("o tren la password");
        let result = user.checkUser(username,password)
        .then(userToken => res.send(userToken))
        .catch( e => {console.log(e); res.send("bạn đã nhập sai tên đăng nhập hoặc mật khẩu")});
    },
    change_password: function(req,res){
        var username = req.body.username;
        var old_password = req.body.old_password;
        var new_password = req.body.new_password;
        var check = database
    }
}