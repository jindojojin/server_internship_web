var database_query = require('./DatabaseModel/database_query');
var job_model = {
    getJobs: async function (startID) {
        if (typeof startID != 'number' || startID < 1) return Promise.reject(new Error("startID không hợp lệ"));
        try {
            let result = await database_query.getListJobs(startID);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
    getUsers: async function (startID, userType) {
        if (typeof startID != 'number' || startID < 1) return Promise.reject(new Error("startID không hợp lệ"));
        if (userType != 'admin' &&
            userType != 'lecturer' &&
            userType != 'student' &&
            userType != 'partner') return Promise.reject(new Error("kiểu người dùng không hợp lệ"));
        try {
            let result = await database_query.getListUsers(startID, userType);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(new Error("truy vấn database thất bại"));
        }
    },
}

module.exports = job_model;