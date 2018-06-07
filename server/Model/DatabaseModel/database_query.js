var Sequelize = require('sequelize')
const Op = Sequelize.Op;
var model_required = require('./switchRequireModel') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

var database_query = {
    getUser: async function (username) {
        try {
            let acc = new model_required('account');
            let user = await acc.findOne({
                where: { username: username },
                raw: true
            })
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error)
        }

    },
    getUserByID: async function (userID) {
        try {
            let acc = new model_required('account');
            let user = await acc.findOne({
                where: { userID: userID },
                raw: true
            })
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    getUserByType: async function (type) {
        try {
            let acc = new model_required('account');
            let arr = await acc.findAll({
                where: { type: type },
                raw: true
            })
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(new Error("không tìm thấy kết quả phù hợp"))
        }
    },
    getUserInfor: async function (userID, type) {
        let userTable = new model_required(type);// chọn bảng thông tin theo kiểu người dùng
        try {
            let userInfor = await userTable.findOne({
                where: { account_userID: userID },
                raw: true
            })
            return Promise.resolve(userInfor);
        } catch (error) {
            return Promise.reject(new Error("khong tim duoc du lieu nguoi dung này"));
        }
    },
    getListJobStudentFollow: async function (studentID,statusOption) {
        try {
            if(statusOption!="all" &&statusOption!="waiting" && statusOption!="accepted" &&  statusOption!="working") return Promise.reject(new Error("statusOption không hợp lệ"))
            let student_follow_job = new model_required("student_follow_job");
            let internship_job = new model_required("internship_job");
            let partner = model_required("partner");
            student_follow_job.belongsTo(internship_job, { foreignKey: 'jobID', targetKey: 'jobID' });
            internship_job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr;
            if(statusOption=="all"){
                arr = await student_follow_job.findAll({
                    include: [
                        {
                            model: internship_job,
                            require: true,
                            include: {
                                model: partner,
                                require: true,
                                attributes: ['name', 'logo']
                            }
                        },
    
                    ],
                    where: {
                        studentID: studentID,
                    },
                    raw: true
                })
            }else{
                arr = await student_follow_job.findAll({
                    include: [
                        {
                            model: internship_job,
                            require: true,
                            include: {
                                model: partner,
                                require: true,
                                attributes: ['name', 'logo']
                            }
                        },
    
                    ],
                    where: {
                        studentID: studentID,
                        status:statusOption,
                    },
                    raw: true
                })
            }            
            return Promise.resolve(arr);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("try vấn thất bại"));
        }
    },
    getListJobs: async function (start, total) {
        try {
            let job = new model_required('internship_job');
            let partner = new model_required('partner');
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr = await job.findAll({
                include: [
                    {
                        model: partner,
                        required: true,
                        attributes: ['name', 'logo'],
                    }
                ],
                offset: start - 1,
                limit: total,
                raw: true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }

    },
    getListJobsByKeySearch: async function (key, typeofKey, start, total) {
        try {
            let job = new model_required('internship_job');
            let partner = new model_required('partner');
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr;// luu ket qua tra ve;
            switch (typeofKey) {
                case "content": {
                    arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],

                            }
                        ],
                        where: { content: { [Op.like]: key } },
                        offset: start - 1,
                        limit: total,
                        raw: true
                    });
                    break;
                }
                case "partnerName": {
                    arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],
                                where: {
                                    name: {
                                        [Op.like]: key
                                    }
                                }
                            }
                        ],
                        offset: start - 1,
                        limit: total,
                        raw: true
                    });
                    break;
                }
                case "title": {
                    arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],
                            }
                        ],
                        where: {
                            title: { [Op.like]: key }
                        },
                        offset: start - 1,
                        limit: total,
                        raw: true
                    });
                    break;
                }
                default: return Promise.reject(new Error("khong xac dinh kieu tim kiem"))
            }

            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListUsers: async function (start, total, userType) {
        try {
            let user = new model_required(userType);
            let arr = await user.findAll({
                offset: start - 1,
                limit: total,
                raw: true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }

    },
    getListUserStudentFollow: async function (studentID) {
        try {
            let student_follow_partner = new model_required("student_follow_partner");
            let student_follow_lecturer = model_required("student_follow_lecturer");
            let arrPartner = await student_follow_partner.findAll({
                where: { studentID: studentID },
                attributes: [['partnerID', 'userID']],
                raw: true
            })
            let arrLecturer = await student_follow_lecturer.findAll({
                where: { studentID: studentID },
                attributes: [['lecturerID', 'userID']],
                raw: true
            })
            arrLecturer.forEach(element => {
                arrPartner.push(element);
            });
            return Promise.resolve(arrPartner);
        } catch (error) {
            return Promise.reject(new Error("try vấn thất bại"));
        }
    },
    getLecturerStudentFollow: async function (studentID) {
        try {
            let student_follow_lecturer = model_required("student_follow_lecturer");
            let lecturer = model_required("lecturer");
            student_follow_lecturer.belongsTo(lecturer, { foreignKey: 'lecturerID', targetKey: 'account_userID' })
            let arrLecturer = await student_follow_lecturer.findAll({
                include: [{
                    model: lecturer,
                }],
                where: { studentID: studentID },
                raw: true
            })
            return Promise.resolve(arrLecturer);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("try vấn thất bại"));
        }
    },
    getListPartnersStudentFollow: async function (studentID) {
        try {
            let student_follow_partner = model_required("student_follow_partner");
            let partner = model_required("partner");
            student_follow_partner.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' })
            let arrPartner = await student_follow_partner.findAll({
                include: [{
                    model: partner,
                }],
                where: { studentID: studentID },
                raw: true
            })
            return Promise.resolve(arrPartner);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("try vấn thất bại"));
        }
    },
    getMessages: async function (userID, start, total) {
        try {
            let mes = new model_required('message');
            let account = new model_required('account');
            mes.belongsTo(account, { foreignKey: 'senderID', targetKey: 'userID' });

            let arr = await mes.findAll({
                include: [
                    {
                        model: account,
                        required: true,
                        attributes: ['nickname'],
                    }
                ],
                where: {
                    receiverID: userID
                },
                order: [['createdAt', 'DESC']],
                offset: start - 1,
                limit: total,
                raw: true
            })
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getMessagesByID: async function (messageID) {
        try {
            let mes = new model_required('message');
            let message = await mes.findAll({
                where: {
                    messageID: messageID
                },
                raw: true
            })
            return Promise.resolve(message[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getTerms: async function () {
        try {
            let term = new model_required("term");
            let arr = await term.findAll({
                raw: true
            }
            )
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getStudentFollowLecturer: async function (lecturerID) {
        try {
            let table = new model_required("student_follow_lecturer");
            let acc = new model_required("account");
            let student = new model_required("student");
            table.belongsTo(acc, { foreignKey: 'studentID', targetKey: 'userID' });
            acc.belongsTo(student, { foreignKey: 'userID', targetKey: 'account_userID' });
            let arr = await table.findAll({
                include: [
                    {
                        model: acc,
                        // required: true,
                        include: [
                            {
                                model: student,
                                // required:true,
                            }
                        ]
                    }
                ],
                where: {
                    lecturerID: lecturerID,
                    status: 'waiting'
                },
                raw: true
            }
            )
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getJobByID: async function (jobID) {
        try {
            let job = new model_required('internship_job');
            let partner = new model_required('partner');
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr = await job.findOne({
                include: [
                    {
                        model: partner,
                        required: true,
                        attributes: ['name', 'logo'],
                    }
                ],
                where: [{ jobID: jobID }],
                raw: true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);

        }
    },
    getStudentAcceptedByLecturer: async function (lecturerID) {
        try {
            let table = new model_required("student_follow_lecturer");
            let acc = new model_required("account");
            let student = new model_required("student");
            table.belongsTo(acc, { foreignKey: 'studentID', targetKey: 'userID' });
            acc.belongsTo(student, { foreignKey: 'userID', targetKey: 'account_userID' });
            let arr = await table.findAll({
                include: [
                    {
                        model: acc,
                        // required: true,
                        include: [
                            {
                                model: student,
                                // required:true,
                            }
                        ]
                    }
                ],
                where: {
                    lecturerID: lecturerID,
                    status: 'accepted'
                },
                raw: true
            }
            )
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPlanReport: async function (studentID,jobID) {
        try {
            let plan_report = new model_required("plan_report");
            let comments = model_required("comments");
            let file = model_required("file");
            let job = model_required("internship_job");

            plan_report.belongsTo(file, { foreignKey: 'fileID', targetKey: 'fileID' });
            plan_report.belongsTo(job, { foreignKey: 'jobID', targetKey: 'jobID' });

            let result = await plan_report.findAll({
                include:[
                    {model:file},
                    {model:job}
                ],
                where:{
                    studentID:studentID,
                    jobID:jobID
                },
                raw:true
            });
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListComment:async function (planReportID){
        try {
            let comment= model_required("comments");
            let account=model_required("account");
            comment.belongsTo(account,{targetKey:'userID',foreignKey:'commenterID'});
            let result = comment.findAll({
                include:[{model:account}],
                where:{planReportID:planReportID},
                raw:true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPlanReportByID: async function(planReportID){
        try {
            let planReport = model_required("plan_report");
            let file = model_required("file");
            planReport.belongsTo(file,{foreignKey:'fileID',targetKey:'fileID'});
            let result = planReport.findAll({
                include:[{model:file}],
                where:{planReportID:planReportID},
                raw:true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListStudentFollowJobOfPartner: async function(partnerID){
        try {
            let job = model_required("internship_job");
            let student = model_required("student");
            let student_follow_job = model_required("student_follow_job");
            student_follow_job.belongsTo(job,{foreignKey:'jobID', targetKey:'jobID'});
            student_follow_job.belongsTo(student,{foreignKey:'studentID',targetKey:'account_userID'});
            let result = student_follow_job.findAll({
                include:[
                    {model:job,
                    where:{partnerID:partnerID}},
                    {model:student}],
                    where:{status:'waiting'},
                raw:true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
module.exports = database_query;
// database_query.getUser("16021031").then(res => console.log(res)).catch( e => console.log(e));
// database_query.getUserInfor(1601,"student").then( res => console.log(res)).catch(e => console.log(e));
// database_query.getUserByID(1).then(r => console.log(r));
// database_query.getListJobs(1).then(r=> console.log(r)).catch(e => console.log(e));
// var a= 145234;
// console.log(typeof a);
// database_query.getMessages(4,1,5).then(r => console.log(r)).catch(e => console.log(e))
// database_query.getUserByType('admin').then( r => console.log(r)).catch(e => console.log(e));
// database_query.getMessagesByID(1).then(r => console.log(r)).catch(e => log(e));
// database_query.getTerms().then(r => console.log(r)).catch( e => console.log(e));
// database_query.getStudentFollowLecturer(20004).then(r => console.log(r)).catch( e => console.log(e))
// database_query.getJobByID(3).then(r => console.log(r)).catch( e => console.log(e))
// database_query.getListJobStudentFollow(3,"waiting").then(r => console.log(r)).catch( e => console.log(e))
// database_query.getListJobsByKeySearch("%The%requirements%","content",1,10).then(r => console.log(r)).catch( e => console.log(e))
// database_query.getListUsers(1,10,"partner").then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListUserStudentFollow(2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListPartnersStudentFollow(2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getLecturerStudentFollow(2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getPlanReport(3,2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListComment(2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getPlanReportByID(4).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListStudentFollowJobOfPartner(20014).then(r => console.log(r)).catch(e => console.log(e));

