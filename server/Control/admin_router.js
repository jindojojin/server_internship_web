var admin_model = require('../Model/adminModel')
var admin_router ={
    getTerms:  function (req,res){
        console.log("đã nhận được yêu cầu xem danh sách học kì");
        admin_model.getTerms()
        .then(
            r =>{res.status(200); 
            res.send(r)}
        )
        .catch( e => {
            console.log(e);
            res.status(500);
            res.send();
        })
    },
    createTerm: function (req,res){
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
            res.send();
        })
        
    },

    deleteTerm: function (req,res){
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
            res.send();
        })
        // console.log(termID);
    },

    updateTerm: function (req,res){
        console.log("đã nhận được 1 yêu cầu sửa học kì");
        let termID= req.params.termID;
        let newContent = req.body;
        admin_model.updateTerm(termID,newContent)
        .then(
            r => {res.status(201); 
                res.send()}
        )
        .catch( e => {
            console.log(e);
            res.status(500);
            res.send();
        })        
    },
    
    createAccount: function (req,res){
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
            res.send();
        })        
    },

    updateAccount: function (req,res){
        console.log("đã nhận được 1 yêu cầu chỉnh sửa tài khoản");
        let account = req.body
        console.log(account);
        admin_model.updateAccount(account)
        .then(
            r=>{res.status(201); 
                res.send()}
        )
        .catch(e =>{
            console.log(e);
            res.status(500);            
            res.send();
        })
    },

    deleteAccount: function (req,res){
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
            res.send();
        })
    },

    updateProfileForUser: function (req,res){
        console.log('đã nhận được một yêu cầu sửa profile cho user từ admin');        
        let userID = req.params.userID;
        let profile = JSON.parse(req.body.infor);
        admin_model.updateProfileForUser(userID,profile)
        .then(
            r=>{res.status(201); 
                res.send()}
        )
        .catch(e =>{
            console.log(e);
            res.status(500);            
            res.send();
        })
    },
    change_password_for_user:function(req,res){
        console.log('đã nhận được một yêu cầu sửa password cho user từ admin');        
        let userID = req.params.userID;
        let newPassword = req.params.newPassword;
        admin_model.change_password_for_user(userID,newPassword)
        .then(
            r=>{res.status(201); 
                res.send()}
        )
        .catch(e =>{
            console.log(e);
            res.status(500);            
            res.send();
        })
    },
    sendListPartnerInfo:function(req,res){
        admin_model.getPartnerInfo()
        .then(
            r=>{res.status(200); 
                res.send(r)}
        )
        .catch(e =>{
            console.log(e);
            res.status(500);            
            res.send();
        })
    },
    updatePartnerInfo:function(req,res){
        let partnerInfo = req.body;
        let adminID = req.cookies.userID;
        console.log(partnerInfo);
        admin_model.updatePartnerInfo(adminID,partnerInfo)
        .then(
            r=>{res.status(201); 
                res.send()}
        )
        .catch(e =>{
            console.log(e);
            res.status(500);            
            res.send();
        })
    }
}
module.exports= admin_router;