var database_insert = require('./DatabaseModel/database_insert')
var database_delete = require('./DatabaseModel/database_delete')
var student_model = {
    follow: async function (studentID, target, targetID) {
        try {
            let result;
            switch (target) {
                case 'partner':
                    result = await database_insert.insertStudentFollowPartner(studentID, targetID);
                    break;
                case 'job':
                    result = await database_insert.insertStudentFollowJob(studentID, targetID);
                    break;
                case 'lecturer':
                    result = await database_insert.insertStudentFollowLecturer(studentID, targetID);
                    break;
                default:
                    break;
            }
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(false)
        }
    },

    unfollow: async function (studentID, target, targetID) {
        try {
            let result;
            switch (target) {
                case 'partner':
                    result = await database_delete.deleteStudentFollowPartner(studentID, targetID);
                    break;
                case 'job':
                    result = await database_delete.deleteStudentFollowJob(studentID, targetID);
                    break;
                case 'lecturer':
                    result = await database_delete.deleteStudentFollowLecturer(studentID, targetID);
                    break;
                default:
                    break;
            }
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(false)
        }
    }
}
module.exports = student_model;