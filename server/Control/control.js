var user_router = require('./user_router')
var student_router = require('./student_router')
const jsonParser = require('body-parser').json();  // nhận json từ client
module.exports= {
    route : function(app){        
        app.get('/',(req,res)=>{res.send("<h1>Trần Quang Linh<h1>")});
        app.post('/signin',jsonParser,(req,res)=>user_router.validate_user(req,res));
         // trả về thông tin cơ bản của user và token

        app.get('/user/id=:userID/profile',(req,res)=> user_router.getUserProfile(req,res)); 
        //trả về thông tin chi tiết của user
        
        app.get('/user/id=:userID/messages/start=:start/total=:total',(req,res)=> user_router.getMessages(req,res)); // chưa viết
        // trả về danh sách total tin nhắn đã nhận gần đây của người dùng bắt đầu từ start theo thứ tự tìm kiếm

        app.post('/user/id=:userID/messages/action=:action',jsonParser,(req,res)=>user_router.sendMessage(req,res)) //chưa viết
        // action= send/reply message, trả về true hoặc false

        app.post('/user/id=:userID/update/password',jsonParser,(req,res)=>user_router.change_password(req,res));
        // thay đổi mật khẩu ; trả về true hoặc false

        app.post('/user/id=:userID/update/profile',jsonParser,(req,res)=>user_router.change_profile(req,res)); //chưa viết
        //cập nhật thông tin cá nhân; trả về true hoặc false

        app.get('/list/jobs/start=:start/total=:total',(req,res)=>user_router.getListJobs(req,res));
        // trả về danh sách 20 bài đăng thực tập bắt đầu từ startID

        app.get('/list/users/type=:type/start=:start/total=:total',(req,res)=>user_router.getListUsers(req,res));
        // trả về danh sách có total giảng viên/ đối tác/ admin / sinh viên bắt đầu từ start theo thứ tự tìm kiếm
              
        app.get('/student/id=:id/action=:action/target=:target/targetID=:targetID',(req,res)=>student_router.follow(req,res));
        //action = follow/ unfollow ; target = partner/ lecturer/ job  ; targetId: partnerID/ lecturerID / jobID
        // thực hiện follow hoặc unfollow, trả về true hoặc false
    }
}