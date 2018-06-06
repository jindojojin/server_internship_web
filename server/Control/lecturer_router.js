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
        let action= req.params.action;
        let studentID = parseInt(req.params.studentID);
        let lecturerID = parseInt(req.cookies.userID);
        lecturer_model.acceptStudent(action,studentID,lecturerID)
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
    getListStudent(req,res){
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
    sendListPlanReportOfStudent:async function(req,res){
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
        
    }
}
module.exports = lecturer_router