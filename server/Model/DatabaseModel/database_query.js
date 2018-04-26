var Sequelize = require('sequelize')
var sequelize = require('./sequelize');
const Op = Sequelize.Op;
let account = require('./models/account')

var model_required = require('./switchRequireModelByUser') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

var database_query = {
    getUser: async function (username) {
        try {
            let acc = new account(sequelize, Sequelize);
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
            let acc = new account(sequelize, Sequelize);
            let user = await acc.findOne({
                where: { userID: userID },
                raw:true
            })
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    getUserByType: async function (type) {
        try {
            let acc = new account(sequelize, Sequelize);
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
        let model = model_required(type);  // chọn bảng thông tin theo kiểu người dùng
        if (model == null) return Promise.reject(new Error("không nhận dạng được kiểu người dùng " + type));
        let usertable = new model(sequelize, Sequelize);
        try {
            let userInfor = await usertable.findOne({
                where: { account_userID: userID },
                raw: true
            })
            return Promise.resolve(userInfor);
        } catch (error) {
            return Promise.reject(new Error("khong tim duoc du lieu nguoi dung này"));
        }
    },
    getListJobs: async function (startID) {
        try {
            let internship_job = require('./models/internship_job')
            let partnerTable = require('./models/partner')
            let job = new internship_job(sequelize, Sequelize);
            let partner = new partnerTable(sequelize,Sequelize);
            job.belongsTo(partner,{foreignKey:'partnerID', targetKey:'account_userID'});
            // partner.hasMany(job,{foreignKey: 'partnerID', sourceKey: 'account_userID'});
            let arr = await job.findAll({
                include:[
                    {
                        model: partner,
                        required : true,
                        attributes:['name', 'logo'],                        
                    }
                ],
                where: {
                    jobID: { [Op.gte]: startID }
                },
                limit: 20,                
                raw:true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }

    },
};
module.exports = database_query;
// database_query.getUser("16021031").then(res => console.log(res)).catch( e => console.log(e));
// database_query.getUserInfor(1601,"student").then( res => console.log(res)).catch(e => console.log(e));
// database_query.getUserByID(1).then(r => console.log(r));
database_query.getListJobs(1).then(r=> console.log(r)).catch(e => console.log(e));
// var a= 145234;
// console.log(typeof a);
// database_query.getUserByType('admin').then( r => console.log(r)).catch(e => console.log(e));
