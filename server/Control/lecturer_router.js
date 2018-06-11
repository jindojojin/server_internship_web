var lecturer_model = require('../Model/lecturerModel')
var student_model = require('../Model/studentModel')

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
        let action = req.params.action;
        let studentID = parseInt(req.params.studentID);
        let lecturerID = parseInt(req.cookies.userID);
        let lecturerName = req.cookies.nickname;
        lecturer_model.acceptStudent(action, studentID, lecturerID, lecturerName)
            .then(
                r => {
                    res.status(200);
                    res.send()
                }
            )
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    getListStudent(req, res) {
        console.log("đã nhận được 1 yêu cầu xem student đang hướng dẫn của lecturer");
        let lecturerID = req.cookies.userID;
        lecturer_model.getMyStudents(lecturerID)
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
    sendListPlanReportOfStudent: function (req, res) {
        console.log("đã nhận được một yêu cầu xem báo cáo từ lecturer");
        let studentID = req.params.studentID;
        student_model.getPlanReport(studentID)
            .then(r => {
                res.status(200);
                res.send(r);
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })

    },
    createNewPlanReport: function (req, res) {
        console.log("đã nhận được một yêu cầu tạo báo cáo thực tập từ lecturer");
        // let studentID = req.params.studentID;
        let newPlanReport = req.body;
        lecturer_model.creatNewPlanReport(newPlanReport)
            .then(r => {
                res.status(201);
                res.send();
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    updatePlanReport: function (req, res) {
        console.log("đã nhận được một yêu cầu chỉnh sửa báo cáo thực tập từ lecturer");
        let newPlanReport = req.body;
        lecturer_model.updatePlanReport(newPlanReport)
            .then(r => {
                res.status(201);
                res.send();
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    deletePlanReport: function (req, res) {
        console.log("đã nhận được một yêu cầu xóa báo cáo thực tập từ lecturer");
        let planReportID = req.params.planReportID;
        lecturer_model.deletePlanReport(planReportID)
            .then(r => {
                res.status(200);
                res.send();
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    deleteComment: function (req, res) {
        console.log("đã nhận được một yêu cầu xóa bình luận từ lecturer");
        let lecturerID = req.cookies.userID;
        let commentID = req.params.commentID;
        lecturer_model.deleteComment(lecturerID, commentID)
            .then(r => {
                res.status(204);
                res.send();
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    sendPointOfPlanReport: function (req, res) {
        let planReportID = req.params.planReportID;
        lecturer_model.getPointOfPlanReport(planReportID)
            .then(r => {
                res.status(200);
                res.send(r);
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    updatePointOfPlanReport: function (req, res) {
        console.log("đã nhận được một yêu cầu chỉnh sửa điểm cho báo cáo thực tập từ lecturer");
        let planReportID = req.params.planReportID;
        let newPointForPlanReport = req.body;
        lecturer_model.updatePointOfPlanReport(planReportID, newPointForPlanReport)
            .then(r => {
                res.status(201);
                res.send();
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    },
    sendMarkTable: function(req,res){
        let lecturerID = req.cookies.userID;
        lecturer_model.getMarkTable(lecturerID)
            .then(r => {
                res.status(200);
                res.send(r);
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            })
    }
}
module.exports = lecturer_router