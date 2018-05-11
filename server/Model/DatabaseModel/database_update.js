var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var model_require = require('../DatabaseModel/switchRequireModelByUser');
var database_query = require('./database_query')

var database_update = {
    change_password: async function (username, new_password, new_salt) {
        try {
            let acc = model_require("account");
            let result = await acc.update({
                password: new_password,
                salt: new_salt
            }, {
                    where: {
                        username: username
                    }
                });
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(false);
        }
    },

    update_student_follow_X: async function (studentID, X_ID, typeOfX) {
        try {
            switch (typeOfX) {
                case "lecturer": {
                    let table = model_require("student_follow_lecturer");

                    await table.update({
                        status: "accepted"
                    }, {
                            where: {
                                studentID: studentID,
                                lecturerID: X_ID
                            }
                        })
                    return Promise.resolve("success!");
                    break;
                }
                case "job": {
                    let student_job = model_require("student_follow_job");

                    await student_job.update({
                        status: "accepted"
                    }, {
                            where: {
                                studentID: studentID,
                                jobID: X_ID
                            }
                        })

                    let internship_job = await database_query.getJobByID(X_ID);
                    let slot_left = internship_job.slot -1;
                    let job = model_require("internship_job");
                    await job.update({
                        slot: slot_left
                    }, {
                            where: {
                                jobID: X_ID
                            }
                        })
                    return Promise.resolve("success!");
                    break;
                }
                default:
                    return Promise.reject(new Error("đối tượng yêu cầu phải là partner hoặc lecturer hoặc job"));
                    break;
            }

        } catch (error) {
            console.log(error);
            return Promise.reject(false);
        }


    }
}

module.exports = database_update;
// database_update.change_password(1,"tranquanglinh","adfasfasdfsafsdfsdfsdfsd").then(r => console.log(r)).catch(e => console.log(e));
database_update.update_student_follow_X("1", "3", "job").then(r => console.log(r)).catch(e => console.log(e));