
var secure = require('./secure')
var database_query = require('./DatabaseModel/database_query');
var database_update = require('./DatabaseModel/database_update')
var userModel = {
    checkUser: async function (username, password) {
        try {
            var res = await database_query.getUser(username);
            let salt = res.salt;
            let hash = res.password;
            if (secure.compare(password, hash, salt)) {
                let token = secure.createUserToken(res);
                var user = { userID: res.userID, username: res.username, nickname: res.nickname, usertoken: token };
                // console.log(user);
                return Promise.resolve(user);
            } else {
                return Promise.reject(new Error("mat khau khong dung"));
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getProfile: async function (userID) {
        let type;
        await database_query.getUserByID(userID)
            .then(res => {
                type = res.type;
            })
            .catch(e => Promise.reject(e))
        if (typeof userID != 'number') {  // userID phải là số
            return Promise.reject(new Error("userID khong hop le"));
        } else {
            try {
                let result = await database_query.getUserInfor(userID, type);
                return Promise.resolve(result);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    },

    changePassword: async function (username, old_password, new_password) {
        try {
            let user = await database_query.getUser(username);
            let salt = user.salt;
            let hash = user.password;
            if (secure.compare(old_password, hash, salt)) {
                console.log("da xac nhan dược người dùng");
                let new_salt = secure.createSalt();
                let new_hash = secure.encrypt(new_password, new_salt);
                let result = await database_update.change_password(username, new_hash, new_salt);
                console.log(result);
                return Promise.resolve(result);
            } else {
                return Promise.reject(false);
            }
        } catch (error) {
            return Promise.reject(false);
        }
    },

    // getProfile:async function(token){
    //     let user =secure.verifyUserToken(token);
    //     let type;
    //     switch(user.permission){
    //         case 1: {type = "admin"; break;}
    //         case 2: {type = "lecturer"; break;}
    //         case 3: {type = "student"; break;}
    //         case 4: {type = "partner"; break;}
    //         default: {type =""; break;}        
    //     }
    //     try {
    //         let ret = await database_query.getUserInfor(user.username,type);
    //         return Promise.resolve(ret);
    //     } catch (error) {
    //         return Promise.reject(new Error("khong xem duoc thong tin cua nguoi dung nay"));
    //     }   
    // },
    checkPermission: function () {

    }
}
module.exports = userModel;

// var a = async function () {
//     let a = await userModel.checkUser("16021031", "16021031");
//     // console.log(a.usertoken);    
//     let dbqr = await userModel.getProfile(1);
//     console.log(dbqr);
// }
// a();
