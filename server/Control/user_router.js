const user = require('../Model/userModel');
const partner_model = require('../Model/partnerModel');
function isUser(req) {
    console.log(req.cookies);
    let userToken = req.cookies.userToken;
    if (userToken != null) {
        let user = require('../Model/secure').verifyUserToken(userToken);
        if (user != null) return true;
        else { return false };
    }
    else {
        return false
    }
}
module.exports = {
    validate_user: function (req, res) {
        let username = req.body.username;
        let password = req.body.userpassword;
        user.checkUser(username, password)
            .then(r => {
                {
                    res.status(201);
                    console.log(r);
                    res.send(r)
                }
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    getUserProfile: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        console.log("da nhận 1 yêu cầu truy cập profile");
        let userID = parseInt(req.params.userID);
        user.getProfile(userID)
            .then(r => {
                {
                    res.status(200);
                    res.send(r)
                }
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    sendMessage: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        let userID = parseInt(req.cookies.userID);
        let action = req.params.action;
        let content = req.body;
        user.sendMessage(userID, action, content).then(
            r => {
                res.status(201);
                res.send();
            }
        ).catch(
            e => {
                console.log(e);
                res.status(500);
                res.send();
            }
        )
    },
    getMessagesByGroup: function (req, res) {
        // console.log("da nhận được 1 yêu cầu xem tin nhắn");
        if (!isUser(req)) { res.status(401); res.send(); return 0 }

        let userID = parseInt(req.cookies.userID);
        user.getMessagesByGroup(userID).then(
            r => {
                res.status(200);
                res.send(r);
            }
        ).catch(e => {
            console.log(e);
            res.status(500);
            res.send();
        });
    },
    getMessages: function (req, res) {
        // console.log("da nhận được 1 yêu cầu xem tin nhắn");

        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        let userID = parseInt(req.cookies.userID);
        let start = parseInt(req.params.start);
        let total = parseInt(req.params.total);
        user.getMessages(userID, start, total).then(
            r => {
                res.status(200);
                res.send(r);
            }
        ).catch(e => {
            console.log(e);
            res.status(500);
            res.send();
        });
    },
    markMessageAsRead: async function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        console.log("đã nhận được yêu cầu đánh dấu tin nhắn là đã đọc");

        let messageID = parseInt(req.params.messageID);
        user.markMessageAsReadOrUnread(messageID, "read")
            .then(r => {
                res.status(200);
                res.send();
            }).catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    markMessageAsUnread: async function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        let messageID = parseInt(req.params.messageID);
        user.markMessageAsReadOrUnread(messageID, "unread")
            .then(r => {
                res.status(200);
                res.send();
            }).catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    change_password: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        let userID = req.cookies.userID;
        let old_password = req.body.old_password;
        let new_password = req.body.new_password;
        user.changePassword(userID, old_password, new_password)
            .then(r => {
                res.status(201);
                res.send();
            }).catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    getListJobs: function (req, res) {
        let start = parseInt(req.params.start);
        let total = parseInt(req.params.total);
        let userID = req.cookies.userID;
        user.getJobs(start, total, userID).then(r => {
            res.status(200);
            // console.log(r);
            res.send(r);
        }).catch(e => {
            console.log(e);
            res.status(500);
            res.send();
        });
    },
    searchJobs: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        let start = parseInt(req.params.start);
        let total = parseInt(req.params.total);
        let userID = parseInt(req.cookies.userID);
        // console.log(req.body);
        let searchKey = req.body.keySearch;
        let typeOfKey = req.body.typeOfKey;
        user.searchJobs(searchKey, typeOfKey, start, total, userID).then(r => {
            res.status(200);
            res.send(r);
        }).catch(e => {
            console.log(e);
            res.status(500);
            res.send();
        });
    },
    getListUsers: function (req, res) {
        let start = parseInt(req.params.start);
        let total = parseInt(req.params.total);
        let userID = req.cookies.userID;
        let userRequest = req.cookies.userType;
        // console.log(userID);
        let type = req.params.type;
        user.getUsers(start, total, type, userID, userRequest).then(r => {
            res.status(200);
            res.send(r);
        }).catch(e => {
            console.log(e);
            res.status(500);
            res.send();
        });
    },
    change_profile: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        let userType = req.cookies.userType;
        let userID = parseInt(req.cookies.userID);
        let logo = (req.files) ? req.files.logo : null;
        let infor = JSON.parse(req.body.infor);
        user.updateProfile(userID, userType, logo, infor)
            .then(r => {
                res.status(201);
                res.send();
            }).catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    getJob: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        console.log("đã nhận được một yêu cầu xem chi tiết công việc");
        let id = parseInt(req.params.id);
        let userID = (req.cookies.userID);
        user.getJob(id, userID)
            .then(r => {
                res.status(200);
                res.send(r);
            }).catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    commentOnPlanReport: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        let planReportID = req.body.planReportID;
        let commenterID = req.cookies.userID;
        let content = req.body.content;
        console.log(commenterID);
        user.commentOnPlanReport(planReportID, commenterID, content)
            .then(r => {
                res.status(201);
                res.send();
            }).catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    getMyAssession: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        console.log("đã nhận được một yêu cầu xem đánh giá sinh viên từ giảng viên")
        let studentID = req.params.studentID;
        let userID = (req.cookies.userID);
        user.getMyAssesion(userID, studentID)
            .then(r => {
                res.status(200);
                res.send(r);
            }).catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    updateMyAssession: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        console.log("đã nhận được một yêu cầu sửa đánh giá sinh viên")
        let studentID = req.params.studentID;
        let userID = (req.cookies.userID);
        let comment = req.body;
        user.updateMyAssession(userID, studentID, comment)
            .then(r => {
                res.status(201);
                res.send();
            }).catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    sendListJobByPartner: function (req, res) {
        if (!isUser(req)) { res.status(401); res.send(); return 0 }
        let partnerID = req.params.partnerID;
        partner_model.getListJobByPartner(partnerID)
            .then(r => {
                {
                    res.status(200);
                    res.send(r)
                }
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    }
}