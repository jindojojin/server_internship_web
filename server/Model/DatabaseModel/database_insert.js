var Sequelize = require('sequelize')
var sequelize = require('./sequelize');
var model_required = require('./switchRequireModelByUser') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

module.exports = {
    insertAccount: async function (listAccount) {
        try {
            let acc = new model_required('account');
            let result = await acc.bulkCreate(listAccount);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },

    insertProfile: async function (listProfile, profileTable) {
        try {
            let table = new model_required(profileTable); // chọn bảng dựa theo kiểu người dùng
            let result = await table.bulkCreate(listProfile);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },

    insertStudentFollowPartner: async function (studentID,partnerID){
        try {
            let table = new model_required('student_follow_partner'); 
            let result = await table.create({studentID:studentID,partnerID:partnerID});
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },

    insertStudentFollowJob: async function (studentID,jobID){
        try {
            let table = new model_required('student_follow_job'); 
            let result = await table.create({studentID:studentID,jobID:jobID,status:'waiting'});
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },

    insertStudentFollowLecturer: async function (studentID,lecturerID){
        try {
            let table = new model_required('student_follow_lecturer'); 
            let result = await table.create({studentID:studentID,lecturerID:lecturerID,status:'waiting'});
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertMessage: async function (message){
        try {
            let table = new model_required('message');
            let result = await table.create(message);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}