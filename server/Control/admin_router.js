var admin_model = require('../Model/adminModel')
var admin_router ={
    getTerms(req,res){
        console.log("đã nhận được yêu cầu xem danh sách học kì");
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