var Sequelize = require('sequelize')
var sequelize = require('./sequelize');
var model_required = require('./switchRequireModelByUser') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

var database_insert = {
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
    },
    insertTerm: async function (term){
        try {
            let table = new model_required('term');
            let result = await table.create(term);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertSkill: async function (skill){
        try {
            let table = new model_required('skill');
            let result = await table.create(skill);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertStudenSkill: async function (studentSkill){
        try {
            let table = new model_required('student_skill');
            let result = await table.create(studentSkill);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertStudenAssession: async function (studentAssession){
        try {
            let table = new model_required('student_assession');
            let result = await table.create(studentAssession);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertPlanReport: async function (planReport){
        try {
            let table = new model_required('plan_report');
            let result = await table.create(planReport);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertLecturerStudent: async function (lecturerStudent){
        try {
            let table = new model_required('lecturer_student');
            let result = await table.create(lecturerStudent);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertComment: async function (comment){
        try {
            let table = new model_required('comment');
            let result = await table.create(comment);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertFile: async function (file){
        try {
            let table = new model_required('file');
            let result = await table.create(file);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    insertJob: async function (job){
        try {
            let table = new model_required('internship_job');
            let result = await table.create(job);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },
}

module.exports = database_insert;
// database_insert.insertTerm({start:'20101001',end:'20111001',title:'học kì ảo'}).then(r => console.log(r)).catch(e => console.log(e));