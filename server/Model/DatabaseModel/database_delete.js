// var Sequelize = require('sequelize')
// const Op = Sequelize.Op;
var model_required = require('./switchRequireModel') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

var database_delete = {
    deleteStudentFollowPartner: async function(studentID,partnerID) {
        try {
            let table = new model_required('student_follow_partner'); 
            let result = await table.destroy({
                where: {
                  studentID: studentID,
                  partnerID: partnerID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteStudentFollowJob: async function(studentID,jobID) {
        try {
            let table = new model_required('student_follow_job'); 
            let result = await table.destroy({
                where: {
                  studentID: studentID,
                  jobID: jobID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteStudentFollowLecturer: async function(studentID,lecturerID) {
        try {
            let table = new model_required('student_follow_lecturer'); 
            let result = await table.destroy({
                where: {
                  studentID: studentID,
                  lecturerID: lecturerID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteAccount:async function(userID){
        try {
            let table = new model_required('account'); 
            let result = await table.destroy({
                where: {
                  userID:userID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteStudent:async function(studentID){
        try {
            let table = new model_required('student'); 
            let result = await table.destroy({
                where: {
                  account_userID: studentID,
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deletePartner:async function(partnerID){
        try {
            let table = new model_required('partner'); 
            let result = await table.destroy({
                where: {
                  account_userID:partnerID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteLecturer:async function(lecturerID){
        try {
            let table = new model_required('lecturer'); 
            let result = await table.destroy({
                where: {
                  account_userID:lecturerID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteAdmin:async function(adminID){
        try {
            let table = new model_required('admin'); 
            let result = await table.destroy({
                where: {
                  account_userID:adminID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteComment:async function(commentID){
        try {
            let table = new model_required('comments'); 
            let result = await table.destroy({
                where: {
                  commentID:commentID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteFile:async function(fileID){
        try {
            let table = new model_required('file'); 
            let result = await table.destroy({
                where: {
                  fileID:fileID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteInternship_job:async function(jobID){
        try {
            let table = new model_required('internship_job'); 
            let result = await table.destroy({
                where: {
                  jobID:jobID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deletePlan_report:async function(plan_reportID){
        try {
            let table = new model_required('plan_report'); 
            let result = await table.destroy({
                where: {
                  planReportID:plan_reportID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteStudent_assession:async function(studentID,assessorID){
        try {
            let table = new model_required('student_assession'); 
            let result = await table.destroy({
                where: {
                  studentID: studentID,
                  assessorID:assessorID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteStudent_skill:async function(skillID,studentID){
        try {
            let table = new model_required('student_skill'); 
            let result = await table.destroy({
                where: {
                  studentID: studentID,
                  skillID:skillID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },  
    deleteTerm: async function(termID){
        try {
            let table = new model_required('term'); 
            let result = await table.destroy({
                where: {
                  termID:termID
                }
              });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = database_delete;