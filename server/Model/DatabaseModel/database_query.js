var database = require('./database');

var database_query = {
    getUser: async function (username) {
        try {
            let myquery = "SELECT * FROM account WHERE username = ?"
            let result = await new database().query(myquery, [username]);
            return Promise.resolve(Object.assign({}, result[0]));
        } catch (error) {
            return Promise.reject(error)
        }

    },

    getUserInfor: async function (userID, type) {
        if (typeof userID !== 'string') {
            return Promise.reject(new Error("userID khong hop le"));
        }
        if (type != "student" && type != "partner" && type != "addmin" && type != "lecturer") {
            return Promise.reject(new Error("khong nhan dang duoc kieu nguoi dung"))
        } else {
            try {
                let myquery = "SELECT * FROM ? WHERE ? = ?";
                let result = await new database().query(myquery, [type, type + "ID", userID]);
                return Promise.resolve(Object.assign({}, result[0]));
            } catch (error) {
                return Promise.reject(error)
            }
        }
    },
};
module.exports = database_query;
// database_query.getUser("16021031").then(res => console.log(res)).catch( e => console.log(e));



