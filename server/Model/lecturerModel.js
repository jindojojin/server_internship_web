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
    acceptStudent: async function (action, studentID, lecturerID, lecturerName) {
        try {
            switch (action) {
                case "accept": {
                    await database_update.update_student_follow_X(studentID, lecturerID, "lecturer");
                    let message = { // tao 1 doi tuong ban ghi message de insert
                        senderID: lecturerID,
                        receiverID: studentID,
                        title: 'Thông báo tự động từ hệ thống về việc đăng ký giảng viên',
                        content: 'Chúc mừng, Giảng viên ' + lecturerName + ' đã đồng ý làm giảng viên hướng dẫn thực tập của bạn.',
                    }
                    await database_insert.insertMessage(message);
                    return Promise.resolve(true);
                }

                case "deny":
                    await database_delete.deleteStudentFollowLecturer(studentID, lecturerID);
                    let message = { // tao 1 doi tuong ban ghi message de insert
                        senderID: lecturerID,
                        receiverID: studentID,
                        title: 'Thông báo tự động từ hệ thống về việc đăng ký giảng viên',
                        content: 'Rất tiếc !, giảng viên ' + lecturerName + 'đã từ chối làm giảng viên hướng dẫn thực tập của bạn. Hãy nhanh chóng đăng ký với giảng viên khác',
                    }
                    await database_insert.insertMessage(message);
                    return Promise.resolve(true);
                    break;

                default:
                    return Promise.reject(new Error("hành động phải là accept hoặc deny"))
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("thêm bảng thất bại"));
        }
    },
    getMyStudents: async function (lecturerID) {
        try {
            let result = await database_query.getStudentAcceptedByLecturer(lecturerID);
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
    creatNewPlanReport: async function (newPlanReport) {
        try {
            // console.log(newPlanReport);
            if (typeof (newPlanReport.deadline) == 'string') {
                newPlanReport.deadline = newPlanReport.deadline.replace(/\-/g, "");
            }
            if (newPlanReport.jobID == "") delete newPlanReport.jobID;
            await database_insert.insertPlanReport(newPlanReport);
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    updatePlanReport: async function (newPlanReport) {
        try {
            // console.log(newPlanReport)
            if (typeof (newPlanReport.deadline) == 'string') {
                newPlanReport.deadline = newPlanReport.deadline.replace(/\-/g, "");
            }
            let planReportID = newPlanReport.planReportID;
            delete newPlanReport.planReportID;
            await database_update.update_plan_report(planReportID, newPlanReport);
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    deletePlanReport: async function (planReportID) {
        try {
            await database_delete.deletePlan_report(planReportID);
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    deleteComment: async function (commenterID, commentID) {
        try {
            let cmt = await database_query.getCommentByID(commentID);
            if (commenterID != cmt.commenterID) return Promise.reject(new Error("không phải là bình luận của người dùng này"));
            await database_delete.deleteComment(commentID);
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    getPointOfPlanReport: async function (planReportID) {
        try {
            let result = await database_query.getLecturer_Student(planReportID);
            console.log(result);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    updatePointOfPlanReport: async function (planReportID, newPointForPlanReport) {
        try {
            let point = await database_query.getLecturer_Student(planReportID);
            if (point != null) {
                await database_update.update_lecturer_student(planReportID, newPointForPlanReport);
            } else {
                await database_insert.insertLecturerStudent(newPointForPlanReport);
            }
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getMarkTable: async function (lecturerID) {
        try {
            let result = await database_query.getMarkTable(lecturerID);
            console.log(result);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    // getExelMarkTable: async function (lecturerID) {
    //     try {
    //         // import XlsExport from '../node_modules/xlsexport/xls-export';
    //         let table = await this.getMarkTable();
    //         var file = new XlsExport(table, 'ấdfafsadf');
    //         file.exportToXLS('adb.xls');
    //         return Promise.resolve(file);
    //     } catch (error) {
    //         return Promise.reject(null);
    //     }
    // }
}
module.exports = lecturer_model;