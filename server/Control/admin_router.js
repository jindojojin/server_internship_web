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
    },
    createTerm(req,res){
        console.log("đã nhận được 1 yêu cầu thêm đợt thực tập");
        let start = req.body.start;
        let end = req.body.end;
        let title = req.body.title;
        admin_model.createTerm(start,end,title)
        .then(
            r => res.send(true)
        )
        .catch( e => {
            console.log(e);
            res.send(null);
        })
        
    },

    deleteTerm(req,res){
        console.log("đã nhận được 1 yêu cầu xóa đợt thực tập");
        let termID = parseInt(req.params.termID);
        admin_model.deleteTerm(termID)
        .then(
            r=> res.send(true)
        )
        .catch(e =>{
            console.log(e);
            res.send(null);
        })
        console.log(termID);
    }
}
module.exports= admin_router;