var database_query = require('./DatabaseModel/database_query');
var database_insert = require('./DatabaseModel/database_insert');
var database_delete = require('./DatabaseModel/database_delete');
var database_update = require('./DatabaseModel/database_update');
var se = require('./secure');
var regex = require('../regex')
var adminModel = {
    getTerms: async function () {
        // console.log("da vao model getTerm");
        try {
            let result = await database_query.getTerms();
            console.log(result);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error);
        }
    },

    createTerm: async function (startDate, endDate, title) {
        try {
            if (!regex.isValidDate(startDate) || !regex.isValidDate(endDate)) return Promise.reject(new Error("định dạng ngày không hợp lệ"))
            let start = startDate.replace(/\-/g, "");// xóa bỏ dấu -
            let end = endDate.replace(/\-/g, "");   // xóa bỏ dấu -     
            let term = { start: start, end: end, title: title }
            let result = await database_insert.insertTerm(term);
            console.log(result);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error);
        }
    },

    deleteTerm: async function (termID) {
        try {
            let result = await database_delete.deleteTerm(termID);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error);
        }
    },
    updateTerm: async function(termID,newContent){
        try {
            if(!regex.isValidDate(newContent.start) || !regex.isValidDate(newContent.end)) 
            return Promise.reject( new Error("định dạng ngày không hợp lệ"));
            newContent.start = regex.deleteJoin(newContent.start);
            newContent.end = regex.deleteJoin(newContent.end); // xóa bỏ dấu -
            let result = await database_update.update_term(termID,newContent);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error);
        }
    },

    createAccount: async function (username, password, type) {
        try {
            let salt = se.createSalt();
            let pass = se.encrypt(password, salt);
            let nickname = username;
            let acc = { username: username, password: pass, nickname: nickname, salt: salt, type: type };
            let acc_inserted = await database_insert.insertAccount([acc]); // vì hàm insertAccount nhận vào 1 mảng
            let insertedID = acc_inserted[0].dataValues.userID;
            await database_insert.insertProfile([{ account_userID: insertedID }], type);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    deleteAccount: async function (userID) {
        let user = await database_query.getUserByID(userID);
        if(user == null) return Promise.reject( new Error("người dùng không tồn tại"));
        let type = user.type;
        try {
            switch (type) {
                case "admin":
                    await database_delete.deleteAdmin(userID);
                    break;
                case "partner":
                    await database_delete.deletePartner(userID);
                    break;
                case "student":
                    await database_delete.deleteStudent(userID);
                    break;
                case "lecturer":
                    await database_delete.deleteLecturer(userID);
                    break;
                default:
                    return Promise.reject(new Error("không tồn tại kiểu người dùng này, xóa profile thất bại"))
            }
            await database_delete.deleteAccount(userID);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    updateAccount: async function (accountEdited){
        try {
            let userID= accountEdited.userID;
            await database_update.update_account(userID,accountEdited);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error)
        }
    }

}
module.exports = adminModel;

// adminModel.createTerm("00014586","20100212","học kì ngon");
// adminModel.createAccount("studentZ", "studentZ", "student").then(r => console.log(r)).catch(e => console.log(e));
// adminModel.updateTerm(6,{start:"2015-12-01",end:"2016-05-04",title:"Học kì phụ"}).then(r => console.log(r)).catch(e => console.log(e));
