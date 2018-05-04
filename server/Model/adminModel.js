var database_query = require('./DatabaseModel/database_query')
var adminModel ={
    getTerms: async function() {
        // console.log("da vao model getTerm");
        try {
        let result = await database_query.getTerms();
        console.log(result);
        return Promise.resolve(JSON.stringify(result));            
        } catch (error) {
            return Promise.reject(error);
        }        
    }
}
module.exports = adminModel;