
var secure = require('./secure')
var database_query = require('./DatabaseModel/database_query');
var database_update = require('./DatabaseModel/database_update');
var database_insert = require('./DatabaseModel/database_insert');
var database_delete = require('./DatabaseModel/database_delete');
var userModel = {
    checkUser: async function (username, password) {
        try {
            var res = await database_query.getUser(username);
            let salt = res.salt;
            let hash = res.password;
            if (secure.compare(password, hash, salt)) {
                let token = secure.createUserToken(res);
                var user = { userID: res.userID, username: res.username, nickname: res.nickname, usertoken: token, usertype: res.type };
                // console.log(user);
                return Promise.resolve( JSON.stringify(user));
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
                return Promise.resolve(JSON.stringify(result));
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
    getJobs: async function (start, total) {
        if (typeof start != 'number' || start < 1 || typeof total != 'number' || total < 1) return Promise.reject(new Error("startID không hợp lệ"));
        try {
            let result = await database_query.getListJobs(start, total);
            result.forEach(element => {
                element.partner_name = element['partner.name'];
                element.partner_logo = element['partner.logo'];
                delete element['partner.name'];
                delete element['partner.logo'];
            });
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    getUsers: async function (start, total, userType) {
        if (typeof start != 'number' || start < 1 || typeof total != 'number' || total < 1) return Promise.reject(new Error("startID không hợp lệ"));
        if (userType != 'admin' &&
            userType != 'lecturer' &&
            userType != 'student' &&
            userType != 'partner') return Promise.reject(new Error("kiểu người dùng không hợp lệ"));
        try {
            let result = await database_query.getListUsers(start, total, userType);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    getMessages: async function (userID, start, total) {
        if (typeof start != 'number' || start < 1 || typeof total != 'number' || total < 1) return Promise.reject(new Error("startID không hợp lệ"));
        try {
            let result = await database_query.getMessages(userID, start, total);
            result.forEach(element => {
                element.senderName = element['account.nickname'];
                delete element['account.nickname'];
            });
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    sendMessage: async function (userID, action, content) {
        let message;
        try {
            switch (action) {
                case 'send':
                    message = { // tao 1 doi tuong ban ghi message de insert
                        senderID: userID,
                        receiverID: content.receiverID,
                        title: content.title,
                        content: content.content,
                    }

                    break;
                case 'reply':
                    let old_message = await database_query.getMessagesByID(content.replyFor);
                    console.log(old_message);
                    let regex= require('../regex');
                    message = { // tao 1 doi tuong ban ghi message de insert
                        senderID: userID,
                        receiverID: old_message.senderID,
                        title: (regex.isReplyMessage(old_message.title)) ? (old_message.title) : ('Re: '+ old_message.title),
                        content: content.content,
                    }
                    break;
                default:
                    return Promise.resolve(new Error("không nhận dạng được hành động ( reply/ send)"));
                    break;
            }
            let result = await database_insert.insertMessage(message);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
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
