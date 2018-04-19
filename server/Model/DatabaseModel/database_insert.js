var db = require('./database');
module.exports = {
    insertAccount: async function (listAccount) {
        try {
            let myquery = "INSERT INTO account (userID, username, password, nickname, salt, permission) VALUES ?";
            let result = await new database().query(myquery, [listAccount]);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}