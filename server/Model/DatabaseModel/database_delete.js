var Sequelize = require('sequelize')
const Op = Sequelize.Op;
var model_required = require('./switchRequireModelByUser') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

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