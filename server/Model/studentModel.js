var database_insert = require('./DatabaseModel/database_insert')
var database_delete = require('./DatabaseModel/database_delete')
var database_query = require('./DatabaseModel/database_query')

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
            let result = await database_query.getListJobStudentFollow(studentID);
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

    getLecturerStudentFollow:async function(studentID){
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
    }
}
module.exports = student_model;

// student_model.getListJobStudentFollow(1).then( r=> console.log(r)).catch(e => console.log(e));