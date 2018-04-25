var Sequelize = require('sequelize')
var sequelize = require('./sequelize');
var model_required = require('./switchRequireModelByUser') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

module.exports = {
    insertAccount: async function (listAccount) {
        try {
            let account = require('./models/account');
            let acc = new account(sequelize, Sequelize);
            let result = await acc.bulkCreate(listAccount);
            // let myquery = "INSERT INTO account (userID, username, password, nickname, salt, permission) VALUES ?";
            // let result = await new db().query(myquery, [listAccount]);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },

    insertProfile: async function (listProfile, profileTable) {
        try {
            let models = new model_required(profileTable); // chọn bảng dựa theo kiểu người dùng
            if(models== null) return Promise.reject(new Error("khong tìm thấy bảng "+ profileTable));
            let table = new models(sequelize,Sequelize);
            let result = await table.bulkCreate(listProfile);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}