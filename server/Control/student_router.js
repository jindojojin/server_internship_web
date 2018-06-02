var student_model = require('../Model/studentModel')
var student_router = {
    follow: async function (req, res) {
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
    sendLecturerFollowed: async function (req,res) {
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
    sendListJobsStudentFollow: async function(req,res){
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
    sendListPartnersStudentFollow: async function(req,res){
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
    }
}

// console.log(parseInt('1234f45'));
module.exports = student_router;