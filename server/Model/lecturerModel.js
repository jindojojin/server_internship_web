var database_query = require('./DatabaseModel/database_query');
var database_insert = require('./DatabaseModel/database_insert');
var database_update = require('./DatabaseModel/database_update');
var database_delete = require('./DatabaseModel/database_delete');
var lecturer_model = {
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
    acceptStudent: async function (action, studentID,lecturerID) {
        try {
            switch (action) {
                case "accept":{
                        await database_update.update_student_follow_X(studentID,lecturerID,"lecturer");
                        return Promise.resolve(true);
                }

                case "deny":
                        await database_delete.deleteStudentFollowLecturer(studentID,lecturerID);
                        return Promise.resolve(true);
                    break;

                default:
                    return Promise.reject(new Error("hành động phải là accept hoặc deny"))
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("thêm bảng thất bại"));
        }
    }
}
module.exports = lecturer_model;