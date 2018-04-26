var user_router = require('./user_router')
var job_router = require('./job_router')
const jsonParser = require('body-parser').json();  // nhận json từ client
module.exports= {
    route : function(app){        
        app.get('/',(req,res)=>{res.send("<h1>Trần Quang Linh<h1>")});
        app.post('/signin',jsonParser,(req,res)=>user_router.validate_user(req,res));
         // trả về thông tin cơ bản của user và token

        app.get('/user/id=:userID/profile',(req,res)=> user_router.getUserProfile(req,res)); 
        //trả về thông tin chi tiết của user
        
        app.get('/user/id=:userID/messages',(req,res)=> user_router.getMessages(req,res)); // chưa viết
        // trả về danh sách 20 tin nhắn đã nhận/gửi gần đây của người dùng

        app.post('/user/id=:userID/update/password',jsonParser,(req,res)=>user_router.change_password(req,res)); //chưa viết
        // thay đổi mật khẩu 

        app.post('/user/id=:userID/update/profile',jsonParser,(req,res)=>user_router.change_profile(req,res)); //chưa viết
        //cập nhật thông tin cá nhân

        app.get('/jobs/startID=:startID',(req,res)=>job_router.getListJobs(req,res));
         // trả về danh sách 20 bài đăng thực tập bắt đầu từ startID
        
    }
}