var Sequelize = require('sequelize')
var db = require('./db');
var account = require('./models/account')

var database_query = {
    getUser: async function (username) {
        try {
            let account = require('./models/account')
            let acc = new account(db,Sequelize);
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

    getUserInfor: async function (userID, type) {
        if (typeof userID !== 'string') {
            return Promise.reject(new Error("userID khong hop le"));
        } else {
            let model;
            switch (type) {
                case 'student':
                    model= require('./models/student');
                    break;
                case 'lecturer':
                    model = require('./models/lecturer');
                    break;
                case 'partner':
                    model = require('./models/partner');
                    break;
                case 'admin':
                    model = require('./models/admin');
                    break;
                default:
                    return Promise.reject(new Error("không nhận dạng được kiểu người dùng"))
            }
            let usertype = new model(db,Sequelize);
            try {
                let userInfor = await usertype.findOne({
                    where: {studentID: userID},
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



