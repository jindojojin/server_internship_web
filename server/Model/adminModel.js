var database_query = require('./DatabaseModel/database_query');
var database_insert = require('./DatabaseModel/database_insert');
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
            if( ! regex.isValidDate(startDate) || ! regex.isValidDate(endDate)) return Promise.reject(new Error("định dạng ngày không hợp lệ"))
            let start= startDate.replace(/\-/g,"");// xóa bỏ dấu -
            let end = endDate.replace(/\-/g,"");   // xóa bỏ dấu -     
            let term = { start: start, end: end, title: title }
            let result = await database_insert.insertTerm(term);
            console.log(result);
            return Promise.resolve(JSON.stringify(result));
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
module.exports = adminModel;

// adminModel.createTerm("00014586","20100212","học kì ngon");