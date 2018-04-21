var db = require('./database');
module.exports = {
    insertAccount: async function (listAccount) {
        try {
            let myquery = "INSERT INTO account (userID, username, password, nickname, salt, permission) VALUES ?";
            let result = await new db().query(myquery, [listAccount]);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    },

    insertProfile: async function (listProfile) {
        let myquery;
        let listProfile2
        listProfile.forEach(element => {
            listProfile2 = [element.userID];
            switch (element.type) {
                case "student":
                    myquery = 'INSERT INTO student(studentID) VALUES ?'
                    break;
                case "admin":
                    myquery = 'INSERT INTO admin (adminID) VALUES ?'
                    break;
                case "partner":
                    myquery = 'INSERT INTO partner (partnerID) VALUES ?'
                    break;
                case "lecturer":
                    myquery = 'INSERT INTO lecturer (lecturerID) VALUES ?'
                    break;
                default:
                    return Promise.reject(new Error("kieu du lieu khong hợp lệ"))
                    break;
            }
            try {
                let myquery = "INSERT INTO account (userID, username, password, nickname, salt, permission) VALUES ?";
                let result = await new db().query(myquery, [listProfile2]);
                return Promise.resolve(result);
            } catch (error) {
                return Promise.reject(error)
            }
        });
        
    }
}