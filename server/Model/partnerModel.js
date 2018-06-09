var database_query = require('./DatabaseModel/database_query');
var database_update = require('./DatabaseModel/database_update');
var database_insert = require('./DatabaseModel/database_insert');
var database_delete = require('./DatabaseModel/database_delete');

var partner_model = {
    acceptStudentFollowJob: async function (action, jobID, studentID, partnerID,partnerName) {
        try {
            let internJob = await database_query.getJobByID(jobID);
            if( partnerID != internJob.partnerID) { return Promise.reject(new Error('Partner không quản lý công việc này'))}
            switch (action) {
                case "accept": {
                    await database_update.update_student_follow_X(studentID, jobID, "job");
                    let message = { // tao 1 doi tuong ban ghi message de insert
                        senderID: partnerID,
                        receiverID: studentID,
                        title: 'Thông báo tự động từ hệ thống về việc đăng ký thực tập',
                        content: 'Chúc mừng!, '+partnerName+' đã chọn bạn vào thực tập công việc '+ internJob.title,
                    }
                    await database_insert.insertMessage(message);
                    return Promise.resolve(true);
                }
                case "deny": {
                    await database_delete.deleteStudentFollowJob(studentID,jobID);
                    let message = { // tao 1 doi tuong ban ghi message de insert
                        senderID: partnerID,
                        receiverID: studentID,
                        title: 'Thông báo tự động từ hệ thống về việc đăng ký thực tập',
                        content: 'Rất tiếc!, '+partnerName+' đã từ chối bạn vào thực tập công việc '+ internJob.title+' Chúc bạn sẽ tìm được công việc phù hợp với mình hơn!',
                    }
                    await database_insert.insertMessage(message);
                    return Promise.resolve(true);
                }
                default:
                return Promise.reject(new Error("hành động không xác định"));
            }
        }  catch (error) {
            return Promise.reject(error)
        }
        
    },
    getListStudentFollowJobOfPartner: async function(partnerID){
        try {
            let result = await database_query.getListStudentFollowJobOfPartner(partnerID);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error)
        }
    },
    getListJobByPartner: async function(partnerID){
        try {
            let result = await database_query.getListJobByPartner(partnerID);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error)
        }
    },
    getListStudentWorkingForPartner: async function (partnerID){
        try {
            let result = await database_query.getListStudentWorkingForPartner(partnerID);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteInternshipJob: async function(jobID){
        try {
            let result = await database_delete.deleteInternship_job(jobID);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error)
        }
    },
    createNewJob: async function(newJob){
        try {
            let result = await database_insert.insertJob(newJob);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    editJob: async function(jobID,jobEdited){
        try {
            let result = await database_update.update_internship_job(jobID,jobEdited);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = partner_model;