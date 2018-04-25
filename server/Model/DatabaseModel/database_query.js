var Sequelize = require('sequelize')
var sequelize = require('./sequelize');
let account = require('./models/account')

var model_required = require('./switchRequireModelByUser') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

var database_query = {
    getUser: async function (username) {
        try {
            let acc = new account(sequelize,Sequelize);
            let user =await acc.findOne({
                where: {username: username},
              })
            return Promise.resolve(user.get({plain:true}));            
            // let myquery = "SELECT * FROM account WHERE username = ?"
            // let result = await new database().query(myquery, [username]);
            // return Promise.resolve(Object.assign({}, result[0]));
        } catch (error) {
            return Promise.reject(error)
        }

    },

    getUserByType: async function(type){
        try {
            let acc = new account(sequelize,Sequelize);
            let arr =await acc.findAll({
                where: {type: type},
              })
            let result=[];
            arr.forEach(user => {
                result.push(user.get({plain:true}));
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(new Error("không tìm thấy kết quả phù hợp"))
        }
    },

    getUserInfor: async function (userID, type) {
        if (typeof userID != 'number') {  // userID phải là số
            return Promise.reject(new Error("userID khong hop le"));
        } else {
            let model = new model_required(type);  // chọn bảng thông tin theo kiểu người dùng
            if(model == null) return Promise.reject(new Error("không nhận dạng được kiểu người dùng "+type));
            let usertable = new model(sequelize,Sequelize);
            try {
                let userInfor = await usertable.findOne({
                    where: {account_userID: userID},
                  })
                return Promise.resolve(userInfor.get({plain:true}));
                // let myquery = "SELECT * FROM ? WHERE ? = ?";
                // let result = await new database().query(myquery, [type, type + "ID", userID]);
                // return Promise.resolve(Object.assign({}, result[0]));
            } catch (error) {
                return Promise.reject(new Error("khong tim duoc du lieu nguoi dung này"));
            }
        }
    },
};
module.exports = database_query;
// database_query.getUser("16021031").then(res => console.log(res)).catch( e => console.log(e));
// database_query.getUserInfor("16021031","student").then( res => console.log(res)).catch(e => console.log(e));



// var a= 145234;
// console.log(typeof a);
// database_query.getUserByType('admin').then( r => console.log(r)).catch(e => console.log(e));
