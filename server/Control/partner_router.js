var partner_model = require("../Model/partnerModel")

var partner_router = {
    acceptStudent: function (req, res) {
        let jobID = req.params.jobID;
        let studentID = req.params.studentID;
        let action = req.params.action;
        let partnerID = req.cookies.userID;
        let partnerName = req.cookies.nickname;
        partner_model.acceptStudentFollowJob(action, jobID, studentID, partnerID, partnerName)
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

    },
    sendListStudentFollowJobs: function (req, res) {
        let partnerID = req.cookies.userID;
        partner_model.getListStudentFollowJobOfPartner(partnerID)
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
    },
    sendListJobByPartner: function (req, res) {
        let partnerID = req.cookies.userID;
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
    },
    sendListStudentWorkingForPartner: function (req, res) {
        let partnerID = req.cookies.userID;
        partner_model.getListStudentWorkingForPartner(partnerID)
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
    },
    deleteInternshipJob: function (req, res) {
        let jobID = req.params.jobID;
        partner_model.deleteInternshipJob(jobID)
            .then(r => {
                {
                    res.status(200);
                    res.send();
                }
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    createNewJob: function (req, res) {
        let partnerID = req.cookies.userID;
        let newJob = req.body;
        newJob.partnerID = partnerID;
        partner_model.createNewJob(newJob)
            .then(r => {
                res.status(201);
                res.send();
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send();
            });
    },
    editJob:function(req,res){
        let jobEdited = req.body;
        let jobID = req.body.jobID;
        partner_model.editJob(jobID,jobEdited)
        .then(r => {
            res.status(201);
            res.send();
        })
        .catch(e => {
            console.log(e);
            res.status(500);
            res.send();
        });
    }
}
module.exports = partner_router;