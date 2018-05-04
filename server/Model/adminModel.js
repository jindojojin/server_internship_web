var database_query = require('./DatabaseModel/database_query')
var adminModel ={
    getTerms: async function() {
        try {
        let result = await database_query.getTerms;
        return Promise.resolve(JSON.stringify(result));            
        } catch (error) {
            return Promise.reject(error);
        }        
    }
}
module.exports = adminModel;