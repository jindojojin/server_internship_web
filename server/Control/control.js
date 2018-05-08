var user_router = require('./user_router');
var student_router = require('./student_router');
var admin_router = require('./admin_router');
var lecturer_router = require('./lecturer_router');
var jsonParser = require('body-parser').json();  // nhận json từ client

module.exports= {
    route : function(app){        
        app.post('/signin',jsonParser,(req,res)=>user_router.validate_user(req,res));  //ok
         // trả về thông tin cơ bản của user và token

        app.get('/user/id=:userID/profile',(req,res)=> user_router.getUserProfile(req,res)); 
        //trả về thông tin chi tiết của user
        
        app.get('/user/messages/action=view/start=:start/total=:total',(req,res)=> user_router.getMessages(req,res));
        // trả về danh sách total tin nhắn đã nhận gần đây của người dùng bắt đầu từ start theo thứ tự tìm kiếm

        app.post('/user/messages/action=:action',jsonParser,(req,res)=>user_router.sendMessage(req,res))
        // action= send/reply message, trả về true hoặc false

        app.post('/user/update/password',jsonParser,(req,res)=>user_router.change_password(req,res));
        // thay đổi mật khẩu ; trả về true hoặc false

        app.post('/user/update/profile',jsonParser,(req,res)=>user_router.change_profile(req,res)); //chưa viết 
        //cập nhật thông tin cá nhân; trả về true hoặc false

        
        
        
        
        
        app.get('/list/jobs/start=:start/total=:total',(req,res)=>user_router.getListJobs(req,res));
        // trả về danh sách total bài đăng thực tập bắt đầu từ startID

        app.get('/list/users/type=:type/start=:start/total=:total',(req,res)=>user_router.getListUsers(req,res));
        // trả về danh sách có total giảng viên/ đối tác/ admin / sinh viên bắt đầu từ start theo thứ tự tìm kiếm
              
        
        
        
        
        
        app.get('/student/action=:action/target=:target/targetID=:targetID',(req,res)=>student_router.follow(req,res));
        //action = follow/ unfollow ; target = partner/ lecturer/ job  ; targetId: partnerID/ lecturerID / jobID
        // thực hiện follow hoặc unfollow, trả về true hoặc false

       
       
       
       
       
        app.get('/lecturer/getStudentsFollowMe',(req,res)=>lecturer_router.getStudentFollowMe(req,res)); // chưa viết
        // trả về mảng các sinh viên đã follow
        
        app.get('/lecturer/action=:action/studentID=:studentID',(req,res)=>lecturer_router.acceptStudent(req,res)); //chưa viết
        // thực hiện hành động accept/deny đối với sinh viên đã đăng kí hướng dẫn, khi giáo viên này đồng ý thì tất cả các yêu cầu khác của sinh viên bị xóa bỏ

        
        
        
        
        
        
        app.get('/admin/getTerms', (req,res)=>admin_router.getTerms(req,res));
        // lấy thông tin các kì thực tập

        app.post('/admin/createTerm',jsonParser,(req,res)=> admin_router.createTerm(req,res)); 
        //thêm đợt thực tập 
        
        app.get('/admin/deleteTerm/termID=:termID',(req,res)=> admin_router.deleteTerm(req,res));
        //xóa đợt thực tập


        // app.use('**',(req,res)=>{res.status(400); res.send("Server không phục vụ yêu cầu này, vui lòng kiểm tra lại đường dẫn")} );
    }
}