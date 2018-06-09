var secure = require('./secure')
var database_query = require('./DatabaseModel/database_query');
var database_update = require('./DatabaseModel/database_update');
var database_insert = require('./DatabaseModel/database_insert');
var database_delete = require('./DatabaseModel/database_delete');

var secure = require('../Model/secure')
var userModel = {
    checkUser: async function (username, password) {
        try {
            var res = await database_query.getUser(username);
            let salt = res.salt;
            let hash = res.password;
            // console.log("user truy vấn trong database:");

            // console.log(res);
            var name;
            switch (res.type) {
                case 'student':
                    name = res['student.name'];
                    break;
                case 'partner':
                    name = res['partner.name'];
                    break;
                case 'lecturer':
                    name = res['lecturer.name'];
                    break;
                case 'admin':
                    name = res['admin.name'];
                    break;
                default:
                    break;
            }
            // console.log('name' + name);
            if (secure.compare(password, hash, salt)) {
                let token = secure.createUserToken(res);
                var user = { userID: res.userID, username: res.username, nickname: name, usertoken: token, usertype: res.type, passwordChanged: res.passwordChanged };
                // console.log(user);
                return Promise.resolve(JSON.stringify(user));
            } else {
                return Promise.reject(new Error("mat khau khong dung"));
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getProfile: async function (userID) {
        let type;
        let assession = null;
        await database_query.getUserByID(userID)
            .then(res => {
                type = res.type;
            })
            .catch(e => Promise.reject(e))
        if (typeof userID != 'number') {  // userID phải là số
            return Promise.reject(new Error("userID khong hop le"));
        } else {
            try {
                if (type == "student") {
                    assession = await database_query.getStudentAssession(userID);
                }
                let result = await database_query.getUserInfor(userID, type);
                result.assession = assession;
                return Promise.resolve(JSON.stringify(result));
            } catch (error) {
                return Promise.reject(error);
            }
        }
    },
    updateProfile: async function (userID, userType, logo, infor) {
        try {
            if (logo != null) {
                var path = require('path');
                // // tạo ra đường dẫn để lưu vào database
                let databasePath = "/Data/img" + userID + "__" + secure.createSalt() + secure.createSalt() + logo.name;
                // // tạo đường dẫn để ghi file
                var file = path.join(__dirname, "..", databasePath);
                await logo.mv(file);
                infor.logo = databasePath;
            }
            await database_update.update_profile(userType, userID, infor);
            return Promise.resolve("success update profile")
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("update profile fail"))
        }
    },
    changePassword: async function (userID, old_password, new_password) {
        try {
            let user = await database_query.getUserByID(userID);
            let salt = user.salt;
            let hash = user.password;
            if (secure.compare(old_password, hash, salt)) {
                console.log("da xac nhan dược người dùng");
                let new_salt = secure.createSalt();
                let new_hash = secure.encrypt(new_password, new_salt);
                let result = await database_update.change_password(userID, new_hash, new_salt);
                console.log(result);
                return Promise.resolve(result);
            } else {
                return Promise.reject(new Error('mật khẩu cũ không đúng'));
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getJobs: async function (start, total, userID) {// userID: id của người lấy danh sách này=> tác dụng đối với sinh viên ( đã đăng kí hay chưa)
        if (typeof start != 'number' || start < 1 || typeof total != 'number' || total < 1) return Promise.reject(new Error("startID không hợp lệ"));
        try {
            let listFollowed;
            if (userID) { // trường hợp người dùng đã đăng nhập
                listFollowed = await database_query.getListJobStudentFollow(userID, "all");
            } else {
                listFollowed = [];
            }
            // console.log("danh sách trả về");
            // console.log(userID);

            let result = await database_query.getListJobs(start, total);
            result.forEach(element => {
                element.partner_name = element['partner.name'];
                element.partner_logo = element['partner.logo'];
                delete element['partner.name'];
                delete element['partner.logo'];
                element.status = "unfollowed";
                listFollowed.forEach(jobFollowed => { //duyet ket qua tìm được vơi danh sách đã follow
                    if (parseInt(jobFollowed['internship_job.jobID']) == parseInt(element['jobID'])) { // nếu trùng nhau thì đổi trạng thái cho job
                        element.status = "followed"
                    }
                });
            });
            // console.log(result);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    getJob: async function (id, userID) {
        try {
            if (userID) { // trường hợp người dùng đã đăng nhập
                listFollowed = await database_query.getListJobStudentFollow(userID, "all");
            } else {
                listFollowed = [];
            }
            // console.log("danh sách trả về");
            // console.log(listFollowed);

            let element = await database_query.getJobByID(id);
            element.partner_name = element['partner.name'];
            element.partner_logo = element['partner.logo'];
            delete element['partner.name'];
            delete element['partner.logo'];
            element.status = "unfollowed";
            listFollowed.forEach(jobFollowed => { //duyet ket qua tìm được vơi danh sách đã follow
                if (parseInt(jobFollowed['internship_job.jobID']) == parseInt(element['jobID'])) { // nếu trùng nhau thì đổi trạng thái cho job
                    element.status = "followed"
                }
            });
            return Promise.resolve(JSON.stringify(element));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    searchJobs: async function (searchKey, typeOfKey, start, total, userID) {
        let key = '%' + searchKey.replace(/\ /g, '%') + '%'; // tạo ra chuổi dùng để truy vấn database
        if (typeof start != 'number' || start < 1 || typeof total != 'number' || total < 1) return Promise.reject(new Error("startID không hợp lệ"));
        try { // giống hệt hàm getJobs
            let listFollowed = await database_query.getListJobStudentFollow(userID, "all");
            // console.log("danh sách trả về");
            // console.log(listFollowed);

            let result = await database_query.getListJobsByKeySearch(key, typeOfKey, start, total);
            result.forEach(element => {
                element.partner_name = element['partner.name'];
                element.partner_logo = element['partner.logo'];
                delete element['partner.name'];
                delete element['partner.logo'];
                element.status = "unfollowed";
                listFollowed.forEach(jobFollowed => {
                    if (parseInt(jobFollowed['internship_job.jobID']) == parseInt(element['jobID'])) {
                        element.status = "followed"
                    }
                });
            });
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    getUsers: async function (start, total, userType, userID) {
        if (typeof start != 'number' || start < 1 || typeof total != 'number' || total < 1) return Promise.reject(new Error("startID không hợp lệ"));
        if (userType != 'admin' &&
            userType != 'lecturer' &&
            userType != 'student' &&
            userType != 'partner') return Promise.reject(new Error("kiểu người dùng không hợp lệ"));
        try {
            let listUserFollowed = await database_query.getListUserStudentFollow(userID);
            let result = await database_query.getListUsers(start, total, userType);
            result.forEach(element => {
                element.status = "unfollowed";
                listUserFollowed.forEach(userFollowed => { //duyet ket qua tìm được vơi danh sách đã follow
                    if (parseInt(userFollowed['userID']) == parseInt(element['account_userID'])) { // nếu trùng nhau thì đổi trạng thái cho job
                        element.status = "followed"
                    }
                });
            });
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
                if (element['account.student.name'] != null) {
                    element.senderName = element['account.student.name'];

                } else if (element['account.partner.name'] != null) {
                    element.senderName = element['account.partner.name'];

                } else if (element['account.lecturer.name'] != null) {
                    element.senderName = element['account.lecturer.name'];

                } else if (element['account.admin.name'] != null) {
                    element.senderName = element['account.admin.name'];
                }
                delete element['account.student.name'];
                delete element['account.student.account_userID'];
                delete element['account.lecturer.name'];
                delete element['account.lecturer.account_userID'];
                delete element['account.partner.name'];
                delete element['account.partner.account_userID'];
                delete element['account.addmin.name'];
                delete element['account.addmin.account_userID'];
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
                    message = { // tao 1 doi tuong ban ghi message de insert
                        senderID: userID,
                        receiverID: content.receiverID,
                        title: content.title,
                        content: content.content,
                    }
                    break;
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
    },
    markMessageAsReadOrUnread: async function (messageID, read_or_unread) {
        try {
            let result = database_update.update_message(messageID, { status: read_or_unread })
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    commentOnPlanReport: async function (planReportID, commenterID, content) {
        try {
            await database_insert.insertComment({ planReportID: planReportID, commenterID: commenterID, content: content })
            return Promise.resolve(true);
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

// userModel.getJobs(1,10,1).then(r=>console.log(r)).catch(e => console.log(e));

// userModel.searchJobs("Công việc","title",1,10,1).then( r => console.log(r)).catch(e => console.log(e));
// userModel.getJob(3, 2).then(r => console.log(r)).catch(e => console.log(e))
// userModel.getUsers(1,19,"partner","2").then(r => console.log(r)).catch(e => console.log(e));
// userModel.checkUser("16021031","16021031").then(r => console.log(r)).catch(e => console.log(e));