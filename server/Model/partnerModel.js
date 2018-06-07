var database_query = require('./DatabaseModel/database_query');
var database_update = require('./DatabaseModel/database_update');
var database_insert = require('./DatabaseModel/database_insert');
var database_delete = require('./DatabaseModel/database_delete');

var partner_model = {
    acceptStudentFollowJob: async function (action, jobID, studentID) {
        switch (action) {
            case "accept": {
                await database_update.update_student_follow_X(studentID, jobID, "job");
                return Promise.resolve(true);
            }
            case "deny": {
                await database_delete.deleteStudentFollowJob(studentID,jobID);
                return Promise.resolve(true);
            }
            default:
            return Promise.reject(new Error("hành động không xác định"));
        }
    },
    getListStudentFollowJobOfPartner: async function(partnerID){
        try {
            let result = await database_query.getListStudentFollowJobOfPartner(partnerID);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = partner_model;