var student_model = require('../Model/studentModel')
var lecturer_model = require('../Model/lecturerModel')
var student_router = {
    follow:function (req, res) {
        let studentID = parseInt(req.cookies.userID);
        console.log(studentID);
        let action = req.params.action;
        let target = req.params.target;
        let targetID = parseInt(req.params.targetID);
        switch (action) {
            case 'follow':
                student_model.follow(studentID, target, targetID).then(r => {
                    res.status(201);
                    res.send();
                }).catch(e => {
                    console.log(e);
                    res.status(500);
                    res.send();
                });
                break;
            case 'unfollow':
                student_model.unfollow(studentID, target, targetID).then(r => {
                    res.status(201);
                    res.send();
                }).catch(e => {
                    console.log(e);
                    res.status(500);
                    res.send();
                });
                break;
            default: {
                res.status(400);//bad request
                res.send();
                break;
            }

        };
    },
    sendLecturerFollowed: function (req,res) {
        let studentID = req.cookies.userID;
        student_model.getLecturerStudentFollow(studentID)
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
    sendListJobsStudentFollow: function(req,res){
        let studentID = req.cookies.userID;
        student_model.getListJobStudentFollow(studentID)
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
    sendListPartnersStudentFollow: function(req,res){
        let studentID = req.cookies.userID;
        student_model.getListPartnerStudentFollow(studentID)
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
    sendListPlanReport:function(req,res){
        let studentID = req.cookies.userID;
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
    changeFileInPlanReport:function(req,res){
        let studentID = req.cookies.userID;
        let fileUpload = (req.files)?req.files.fileUpload:null;
        let planRePortID = req.body.planReportID;
        student_model.changePlanReportFile(studentID,planRePortID,fileUpload)
        .then(r => {
            res.status(201);
            res.send(r);
        })
        .catch(e => {
            console.log(e);
            res.status(500);
            res.send();
        })
    },
    updatePlanReport: function(req,res){
        console.log("đã nhận được một yêu cầu chỉnh sửa báo cáo thực tập từ student");
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
    createNewPlanReport: function(req,res){
        console.log("đã nhận được một yêu cầu tạo báo cáo thực tập từ student");
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
    deleteComment: function(req,res){
        console.log("đã nhận được một yêu cầu xóa bình luận từ student");
        let studentID = req.cookies.userID;
        let commentID = req.params.commentID;
        lecturer_model.deleteComment(studentID,commentID)
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
    addNewPartnerInfo: function(req,res){
        console.log("đã nhận được một yêu cầu xác thực công ty");
        // let studentID = req.params.studentID;
        let studentID = req.cookies.userID;
        let partnerInfo = req.body;
        console.log(partnerInfo);
        student_model.createPartnerInfo(studentID,partnerInfo)
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
    choseJobToWork: function(req,res){
        let studentID = req.cookies.userID;
        let jobID = req.params.jobID;
        student_model.choseJobToWork(studentID,jobID)
        .then(r => {
            res.status(201);
            res.send();
        })
        .catch(e => {
            console.log(e);
            res.status(500);
            res.send();
        })  
    }
}

// console.log(parseInt('1234f45'));
module.exports = student_router;