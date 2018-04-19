
var secure = require('./secure')
var database_query = require('./DatabaseModel/database_query');
var userModel = {
    checkUser: async function (username, password) {
        try {
            var res = await database_query.getUser(username);
            let salt = res.salt;
            let hash = res.password;
            if (secure.compare(password, hash, salt)) {
                let token = secure.createUserToken(res);
                var user = { username: res.username, nickname: res.nickname, usertoken: token };
                // console.log(user);
                return Promise.resolve(user);
            } else {
                return Promise.reject(new Error("mat khau khong dung"));
            }
        } catch (error) {
            return Promise.reject(e);
        }
    },
    
    getProfile:async function(token){
        let user =secure.verifyUserToken(token);
        let type;
        switch(user.permission){
            case 1: {type = "admin"; break;}
            case 2: {type = "lecturer"; break;}
            case 3: {type = "student"; break;}
            case 4: {type = "partner"; break;}
            default: {type =""; break;}        
        }
        try {
            let ret = await database_query.getUserInfor(user.username,type);
            return Promise.resolve(ret);
        } catch (error) {
            return Promise.reject(new Error("khong xem duoc thong tin cua nguoi dung nay"));
        }   
    },
    checkPermission: function(){

    }
}
module.exports = userModel;

var a = async function () {
    let a = await userModel.checkUser("16021031", "16021031");
    console.log(a.usertoken);    
    let dbqr = await userModel.getProfile(a.usertoken);
}
a();
