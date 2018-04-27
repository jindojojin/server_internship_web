var Sequelize = require('sequelize')
var sequelize = require('./sequelize');
var model_required = require('./switchRequireModelByUser') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

module.exports = {
    insertAccount: async function (listAccount) {
        try {
            let acc = new model_required('account');
            let result = await acc.bulkCreate(listAccount);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },

    insertProfile: async function (listProfile, profileTable) {
        try {
            let table = new model_required(profileTable); // chọn bảng dựa theo kiểu người dùng
            let result = await table.bulkCreate(listProfile);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },

    insertFollow: async function (studentID, targetType, targetID){

    }
}