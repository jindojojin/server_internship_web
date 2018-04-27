job_model = require('../Model/jobModel')
var job_router={
    getListJobs: function(req,res){
        let startID = parseInt(req.params.startID);
        job_model.getJobs(startID).then( r => res.send(r)).catch(e =>{
            console.log(e);
            res.send(null);
        })
    },

    getListUsers: function(req,res){
        let startID = parseInt(req.params.startID);
        let type = req.params.type;
        job_model.getUsers(startID,type).then( r => res.send(r)).catch(e =>{
            console.log(e);
            res.send(null);
        })
    },

}
module.exports= job_router;