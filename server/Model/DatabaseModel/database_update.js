var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var model_require = require('../DatabaseModel/switchRequireModel');
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
                    let slot_left = internship_job.slot - 1;
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


    },

    update_account: async function (userID, new_Username, new_Nickname, new_Type) {
        try {
            let acc = model_require("account");
            if (new_Type != null) { //kiểu người dùng bị thay đổi => xóa bỏ bản ghi từ kiểu người dùng cũ, thêm mới bản ghi vào phía người dùng mới
                await acc.update({
                    username: new_Username,
                    nickname: new_Nickname,
                    type: new_Type
                }, {
                        where: { userID: userID }
                    });
                
            } else {
                await acc.update({
                    username: new_Username,
                    nickname: new_Nickname
                }, {
                        where: { userID: userID }
                    });
            }

            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(false);
        }

    },

    update_profile: async function(userType,userID,newProfile){
        try {
            let profile = model_require(userType);
            await profile.update(newProfile,{
                where:{
                account_userID:userID
            }});
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = database_update;
// database_update.change_password(1,"tranquanglinh","adfasfasdfsafsdfsdfsdfsd").then(r => console.log(r)).catch(e => console.log(e));
// database_update.update_student_follow_X("1", "3", "job").then(r => console.log(r)).catch(e => console.log(e));

let profile = {
    class:"K61-CD",
    grade:"2",
    majors:"Công nghệ thông tin",
    address:"Khu 5, Xuân Lộc, Thanh Thủy, Phú Thọ",
    name:"Trần Quang Linh",
    dateOfBirth:"19980501",
    vnumail:"16021031",
    gpa: 34,
    graduationYear:"2020",
    email:"Tranquanglinh.pt@gmail.com",
    skypeID:"",
    facebook:"https://www.facebook.com/jindojojin",
    phoneNumber:"16021031",
    position: "",
    favorite:"Tốc độ, xem phim của Marvel",
    orientation:"Công nghệ thông tin",
    note:"Thích làm web",
    picture:""
}

// database_update.update_profile('student',1032,profile).then(r=> console.log("Thành công")).catch(e => console.log(e));