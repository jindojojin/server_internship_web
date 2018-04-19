var signin_router = require('./signin_router')
const jsonParser = require('body-parser').json();  // nhận json từ client
module.exports= {
    route : function(app){
        app.get('/',function(req,res){
            res.send("adfasdfsdaf");
        }),
        app.post('/signin',jsonParser,(req,res)=>signin_router.validate_user(req,res))
    }
}