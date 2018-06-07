var partner_model = require("../Model/partnerModel")

var partner_router ={
    acceptStudent: function(req,res){
        let jobID = req.params.jobID;
        let studentID =req.params.studentID;
        let action =req.params.action;
        // chưa kiểm tra job này có thuộc quyền quản lí của partner này không

        partner_model.acceptStudentFollowJob(action, jobID, studentID)
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
    sendListStudentFollowJobs:function(req,res){
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
    }
}
module.exports = partner_router;