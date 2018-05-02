const user = require('../Model/userModel');
module.exports = {
    validate_user: function (req, res) {
        // if(req.cookies.usertoken != undefined){ res.redirect('/home') }
        // else{
            // console.log("da nhận 1 yêu cầu validate");
            let username = req.body.username;
            let password = req.body.userpassword;
            
            // console.log(password);
            // console.log("o tren la password");
            user.checkUser(username, password)
                .then(userToken => {
                    res.send(JSON.stringify(userToken));//
                    // console.log('cookie created successfully');
                })
                .catch(e => {
                    console.log(e);
                    res.send(null)
                });
        // }
        
    },
    getUserProfile: function (req, res) {
        console.log("da nhận 1 yêu cầu truy cập profile");
        let userID = parseInt(req.params.userID);
        user.getProfile(userID)
            .then(userInfor => res.send(userInfor))
            .catch(e => {
                console.log(e);
                res.send(null);
            })
    },

    sendMessage: function (req, res) {
        let userID = parseInt(req.params.userID);
        let action = req.params.action;
        let content = req.body;
        user.sendMessage(userID, action, content).then(
            r => res.send(true)
        ).catch(

            e => {
                console.log(e);
                res.send(false)
            }
        )
    },

    getMessages: function (req, res) {
        console.log("da nhận được 1 yêu cầu xem tin nhắn");
        
        let userID = req.params.userID;
        let start = parseInt(req.params.start);
        let total = parseInt(req.params.total);
        user.getMessages(userID, start, total).then(
            r => {console.log(r);res.send(r)}
        ).catch(e => res.send(null));
    },

    change_password: function (req, res) {
        let username = req.body.username;
        let old_password = req.body.old_password;
        let new_password = req.body.new_password;
        user.changePassword(username, old_password, new_password)
            .then(r => res.send(true)).catch(e => res.send(null));
    },

    getListJobs: function (req, res) {
        let start = parseInt(req.params.start);
        let total = parseInt(req.params.total);
        user.getJobs(start, total).then(r => res.send(r)).catch(e => {
            console.log(e);
            res.send(null);
        })
    },

    getListUsers: function (req, res) {
        let start = parseInt(req.params.start);
        let total = parseInt(req.params.total)
        let type = req.params.type;
        user.getUsers(start, total, type).then(r => res.send(r)).catch(e => {
            console.log(e);
            res.send(null);
        })
    },
}