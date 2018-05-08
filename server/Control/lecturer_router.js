var lecturer_model = require('../Model/lecturerModel')
var lecturer_router = {
    getStudentFollowMe: function (req, res) {
        console.log("đã nhận được 1 yêu cầu xem student follow lecturer");
        let lecturerID = req.cookies.userID;
        lecturer_model.getStudentFollowMe(lecturerID)
            .then(
                r => {
                    res.status(200);
                    res.send(r)
                }
            )
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    acceptStudent: function (req, res) {
    },
}
module.exports = lecturer_router