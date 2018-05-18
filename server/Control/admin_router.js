var admin_model = require('../Model/adminModel')
var admin_router ={
    getTerms(req,res){
        console.log("đã nhận được yêu cầu xem danh sách học kì");
        admin_model.getTerms()
        .then(
            r =>{res.status(200); 
            res.send(r)}
        )
        .catch( e => {
            console.log(e);
            res.status(500);
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
            r => {res.status(201); 
                res.send()}
        )
        .catch( e => {
            console.log(e);
            res.status(500);
            res.send(null);
        })
        
    },

    deleteTerm(req,res){
        console.log("đã nhận được 1 yêu cầu xóa đợt thực tập");
        let termID = parseInt(req.params.termID);
        admin_model.deleteTerm(termID)
        .then(
            r=>{res.status(204); 
                res.send()}
        )
        .catch(e =>{
            console.log(e);
            res.status(500);            
            res.send(null);
        })
        // console.log(termID);
    },

    updateTerm(req,res){

    },
    
    createAccount(req,res){
        console.log("đã nhận được 1 yêu cầu thêm tài khoản");
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type;
        admin_model.createAccount(username,password,type)
        .then(
            r => {res.status(201); 
                res.send()}
        )
        .catch( e => {
            console.log(e);
            res.status(500);
            res.send(null);
        })        
    },

    deleteAccount(req,res){
        console.log("đã nhận được 1 yêu cầu xóa tài khoản");
        let userID = req.params.userID;
        admin_model.deleteAccount(userID)
        .then(
            r=>{res.status(204); 
                res.send()}
        )
        .catch(e =>{
            console.log(e);
            res.status(500);            
            res.send(null);
        })
    },

    updateAccount(req,res){

    },
}
module.exports= admin_router;