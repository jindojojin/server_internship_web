var database_query = require('./DatabaseModel/database_query');
var database_insert = require('./DatabaseModel/database_insert');
var lecturer_model ={
    getStudentFollowMe: async function (lecturerID) {
        try {
            let result = await database_query.getStudentFollowLecturer(lecturerID);
            result.forEach(element => {
                element.studentName = element['account.nickname'];
                element.studentCode = element['account.student.studentCode'];
                element.userID = element['account.student.account_userID'];
                                
                delete element['account.nickname'];
                delete element['account.student.studentCode'];
                delete element['account.student.account_userID'];
                
            });
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
}
module.exports = lecturer_model;