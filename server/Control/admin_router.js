var admin_model = require('../Model/adminModel')
var admin_router ={
    getTerms(req,res){
        admin_model.getTerms()
        .then(
            r => res.send(r)
        )
        .catch( e => {
            console.log(e);
            res.send(null);
        })

    }
}
module.exports= admin_router;