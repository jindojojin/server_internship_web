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
    getListJobStudentFollow: async function(studentID){
        try {
            let student_follow_job = new model_required("student_follow_job");
            let internship_job = new model_required("internship_job");
            student_follow_job.belongsTo(internship_job,{foreignKey:'jobID', targetKey:'jobID'});
            let arr = await student_follow_job.findAll({
                include:[
                    {
                        model: internship_job,
                        require: true,
                    }
                ],
                where:{
                    studentID: studentID
                },
                attributes:[],                
                raw: true
            })
            return Promise.resolve(arr);
        } catch (error) {
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

    getListJobsByKeySearch: async function(key,typeofKey,start,total){
        try {
            let job = new model_required('internship_job');
            let partner = new model_required('partner');
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr;// luu ket qua tra ve;
            switch(typeofKey){
                case "content":{
                     arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],
                                
                            }
                        ],
                        where: { content:{[Op.like]:key}},
                        offset: start - 1,
                        limit: total,
                        raw: true
                    });
                    break;
                }
                case "partnerName":{
                     arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],
                                where:{ name:{
                                    [Op.like]:key
                                }}
                            }
                        ],
                        offset: start - 1,
                        limit: total,
                        raw: true
                    });
                    break;
                }
                case "title":{
                     arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],
                            }
                        ],
                        where:{
                            title:{[Op.like]:key}
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
                where:{
                    receiverID:userID
                },
                order:[['createdAt', 'DESC']],
                offset: start - 1,
                limit: total,
                raw: true
            })
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getMessagesByID: async function( messageID){
        try {
            let mes = new model_required('message');
            let message = await mes.findAll({
                where:{
                    messageID: messageID
                },
                raw: true
            })
            return Promise.resolve(message[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getTerms: async function(){
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
    getStudentFollowLecturer:async function(lecturerID){
        try {
            let table = new model_required("student_follow_lecturer");
            let acc = new model_required("account");
            let student = new model_required("student");
            table.belongsTo(acc,{foreignKey: 'studentID', targetKey:'userID'});
            acc.belongsTo(student,{foreignKey:'userID',targetKey:'account_userID'});
            let arr = await table.findAll({
                include: [
                    {
                        model: acc,
                        // required: true,
                        attributes: ['nickname'],
                        include:[
                            {
                                model: student,
                                // required:true,
                                attributes:['studentCode'],
                            }
                        ]
                    }
                ],
                where:{
                    lecturerID:lecturerID,
                    status:'waiting'
                },
                attributes:[],
                raw: true
            }
            )
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getJobByID: async function(jobID){
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
                where:[{jobID:jobID}],
                raw: true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
            
        }
    }
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
// database_query.getListJobStudentFollow(1).then(r => console.log(r)).catch( e => console.log(e))
// database_query.getListJobsByKeySearch("%The%requirements%","content",1,10).then(r => console.log(r)).catch( e => console.log(e))
// database_query.getListUsers(1,10,"partner").then(r => console.log(r)).catch(e => console.log(e));
