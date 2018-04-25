var user_router = require('./user_router')
const jsonParser = require('body-parser').json();  // nhận json từ client
module.exports= {
    route : function(app){        
        app.get('/',function(req,res){
            res.send("<h1>Trần Quang Linh<h1>");
        }),
        app.post('/signin',jsonParser,(req,res)=>user_router.validate_user(req,res));
        app.get('/user/id=:userID',(req,res)=> user_router.getUserProfile(req,res));
    }
}