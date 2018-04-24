var signin_router = require('./signin_router')
const jsonParser = require('body-parser').json();  // nhận json từ client
module.exports= {
    route : function(app){
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
            next();
        });
        app.get('/',function(req,res){
            res.send("adfasdfsdaf");
        }),
        app.post('/signin',jsonParser,(req,res)=>signin_router.validate_user(req,res))
    }
}