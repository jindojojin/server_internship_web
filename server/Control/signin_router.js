const user = require('../Model/userModel');
module.exports = {
    validate_user: function(req,res){
        let username = req.body.username;
        let password = req.body.password;
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