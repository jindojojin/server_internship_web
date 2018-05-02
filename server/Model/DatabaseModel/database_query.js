var Sequelize = require('sequelize')
const Op = Sequelize.Op;
var model_required = require('./switchRequireModelByUser') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

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
