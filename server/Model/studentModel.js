var database_insert = require('./DatabaseModel/database_insert')
var database_delete = require('./DatabaseModel/database_delete')
var database_query = require('./DatabaseModel/database_query')
var database_update = require('./DatabaseModel/database_update')
var secure = require('./secure')


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
    },

    getListJobStudentFollow: async function (studentID) {
        try {
            let result = await database_query.getListJobStudentFollow(studentID, "all");
            result.forEach(element => {
                element.jobID = element['internship_job.jobID'];
                element.partnerID = element['internship_job.partnerID'];
                element.termID = element['internship_job.termID'];
                element.endDate = element['internship_job.endDate'];
                element.startDate = element['internship_job.startDate'];
                element.slot = element['internship_job.slot'];
                element.title = element['internship_job.title'];
                element.content = element['internship_job.content'];
                element.partnerName = element['internship_job.partner.name'];
                element.partnerLogo = element['internship_job.partner.logo'];



                delete element['internship_job.jobID'];
                delete element['internship_job.partnerID'];
                delete element['internship_job.termID'];
                delete element['internship_job.endDate'];
                delete element['internship_job.startDate'];
                delete element['internship_job.slot'];
                delete element['internship_job.title'];
                delete element['internship_job.content'];
                delete element['internship_job.partner.name'];
                delete element['internship_job.partner.logo'];

            });
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    getListPartnerStudentFollow: async function (studentID) {
        try {
            let result = await database_query.getListPartnersStudentFollow(studentID);
            result.forEach(element => {
                element.name = element['partner.name'];
                element.logo = element['partner.logo'];
                element.partnerID = element['partner.account_userID'];
                element.phoneNumber = element['partner.phoneNumber'];
                delete element['partner.name'];
                delete element['partner.logo'];
                delete element['partner.account_userID'];
                delete element['partner.phoneNumber'];
            });
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },

    getLecturerStudentFollow: async function (studentID) {
        try {
            let result = await database_query.getLecturerStudentFollow(studentID)
            result.forEach(element => {
                element.name = element['lecturer.name'];
                element.logo = element['lecturer.logo'];
                element.lecturerID = element['lecturer.account_userID'];
                element.phoneNumber = element['lecturer.phoneNumber'];
                delete element['lecturer.name'];
                delete element['lecturer.logo'];
                delete element['lecturer.account_userID'];
                delete element['lecturer.phoneNumber'];
            });
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    getPlanReport: async function (studentID) {
        console.log(studentID);
        try {
            let job = await database_query.getListJobStudentFollow(studentID, "working");
            // console.log(job);
            let arr = await database_query.getPlanReport(studentID);
            // console.log(arr);
            if (arr == []) return Promise.resolve(JSON.stringify({ job: job[0], planReports: [] }));
            let result = [];

            for (let element of arr) {
                element.comments = await database_query.getListComment(element.planReportID);
                // element.jobID =(job[0])? (job[0].jobID): null;
                result.push(element);
            };

            return Promise.resolve(JSON.stringify({ job: job[0], planReports: result }));
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    changePlanReportFile: async function (studentID, planReportID, fileUpload) {
        try {
            // console.log("planReportID:"+planReportID);
            let planReport = await database_query.getPlanReportByID(planReportID);
            // console.log("studentID:"+studentID);
            // console.log(fileUpload);


            if (planReport[0].studentID != studentID) return Promise.reject(new Error("Student này không phải chủ của báo cáo được yêu cầu sửa đổi"));
            var path = require('path');
            // // tạo ra đường dẫn để lưu vào database
            let databasePath = "/Data/Student/reportData/" + studentID + "__" + secure.createSalt() + secure.createSalt() + fileUpload.name;
            // // tạo đường dẫn để ghi file
            var file = path.join(__dirname, "..", databasePath);
            await fileUpload.mv(file);
            if (planReport[0]['file.fileID'] == null) { //đã tồn tại file báo cáo
                // console.log("file chưa có trong database");

                let fileToInsert = { fileName: fileUpload.name, path: databasePath };
               let fileInserted = await database_insert.insertFile(fileToInsert);
            //    console.log(fileInserted);
                await database_update.update_plan_report(planReportID, { fileID: fileInserted.fileID });
            } else {
                // console.log("file đã có trong database");

                let oldFilePath = planReport[0]['file.path']; // lấy đường dẫn đến file báo cáo cũ
                var oldFile = path.join(__dirname, "..", oldFilePath);
                let fileToUpdate = { fileName: fileUpload.name, path: databasePath };
                await database_update.update_file(planReport[0]['file.fileID'], fileToUpdate);
                let fs = require('fs');
                fs.unlinkSync(oldFile);//xóa file cũ khỏi bộ nhớ
            }
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    createPartnerInfo: async function (studentID, partnerInfo) {
        try {
            console.log(partnerInfo);
            partnerInfo.requesterID = studentID;
            await database_insert.insertPartnerInfo(partnerInfo);
            let arrAdmin = await database_query.getUserByType("admin");
            let student = await database_query.getUserInfor(studentID,"student");
            let studentName = student.name;
            let message = {
                senderID: studentID,
                title: 'Thông báo tự động về yêu cầu xác nhận công ty thực tập',
                content: 'Sinh viên ' + studentName + ' đã gửi một yêu cầu xác nhận thông tin của một công ty'
            }
            for (admin of arrAdmin) {
                console.log(admin);
                message.receiverID = admin.userID;
                await database_insert.insertMessage(message);
            }
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    choseJobToWork: async function(studentID,jobID){
        try {
            await database_update.update_student_folow_job(studentID,jobID,{status:'working'});
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    }
}
module.exports = student_model;

// student_model.getListJobStudentFollow(1).then( r=> console.log(r)).catch(e => console.log(e));
// student_model.getPlanReport(3).then( r=> console.log(r)).catch(e => console.log(e));