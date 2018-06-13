var user_router = require('./user_router');
var student_router = require('./student_router');
var admin_router = require('./admin_router');
var lecturer_router = require('./lecturer_router');
var partner_router = require('./partner_router');
var jsonParser = require('body-parser').json();  // nhận json từ client
var multer = require('multer');

module.exports = {
    route: function (app) {
        app.post('/signin', jsonParser, (req, res) => user_router.validate_user(req, res));  //ok
        // trả về thông tin cơ bản của user và token
        app.get('/profile/id=:userID', (req, res) => user_router.getUserProfile(req, res));
        //trả về thông tin chi tiết của user
        app.get('/user/messages/action=view/start=:start/total=:total', (req, res) => user_router.getMessages(req, res));
        // trả về danh sách total tin nhắn đã nhận gần đây của người dùng bắt đầu từ start theo thứ tự tìm kiếm
        app.post('/user/messages/action=:action', jsonParser, (req, res) => user_router.sendMessage(req, res))
        // action= send/reply message, trả về true hoặc false
        app.get('/user/message/action=markRead/messageID=:messageID', (req, res) => user_router.markMessageAsRead(req, res))
        app.get('/user/message/action=markUnRead/messageID=:messageID', (req, res) => user_router.markMessageAsUnread(req, res))
        app.get('/user/messagesGroupBySender',(req,res)=>user_router.getMessagesByGroup(req,res))
        //lấy về mảng tin nhắn nhóm theo người gửi
        app.put('/user/update/password', jsonParser, (req, res) => user_router.change_password(req, res));
        // thay đổi mật khẩu ; trả về true hoặc false
        app.put('/user/update/profile', (req, res) => user_router.change_profile(req, res)); //chưa viết 
        //cập nhật thông tin cá nhân; trả về true hoặc false
        app.post('/user/commentOnPlanReport', jsonParser, (req, res) => user_router.commentOnPlanReport(req, res))
        // comment vào bài viết báo cáo thực tập
        app.get('/user/myAssession/studentID=:studentID',(req,res)=> user_router.getMyAssession(req,res));
        // trả về nội dung đã nhận xét về student có ID là studentID
        app.put('/user/myAssess/studentID=:studentID',jsonParser,(req,res) => user_router.updateMyAssession(req,res));
        // cập nhập nhận xét cho sinh viên có ID là studentID 


        app.get('/job/id=:id', (req, res) => user_router.getJob(req, res));
        //trả về chi tiết của công việc có jobid là :id
        app.get('/list/jobs/start=:start/total=:total', (req, res) => user_router.getListJobs(req, res));
        // trả về danh sách total bài đăng thực tập bắt đầu từ startID
        app.get('/list/users/type=:type/start=:start/total=:total', (req, res) => user_router.getListUsers(req, res));
        // trả về danh sách có total giảng viên/ đối tác/ admin / sinh viên bắt đầu từ start theo thứ tự tìm kiếm
        app.post('/list/jobs/start=:start/total=:total', jsonParser, (req, res) => user_router.searchJobs(req, res));
        // trả về danh sách có total bài đăng thực tập bắt đầu từ startID khi nhận được request post có dạng : 
        //{"keySearch":"<Nội dung tìm kiếm>", "typeOfKey":"<kiểu tìm kiếm>"} trong đó <kiểu tìm kiếm> là title/ partnerName/ content
        app.get('/listJobByPartner/partnerID=:partnerID',(req,res)=> user_router.sendListJobByPartner(req,res))
        






        app.get('/student/action=:action/target=:target/targetID=:targetID', (req, res) => student_router.follow(req, res));
        //action = follow/ unfollow ; target = partner/ lecturer/ job  ; targetId: partnerID/ lecturerID / jobID
        // thực hiện follow hoặc unfollow, trả về true hoặc false
        app.get('/student/listPartnersFollowed', (req, res) => student_router.sendListPartnersStudentFollow(req, res));
        //lấy các đối tác đang theo dõi
        app.get('/student/lecturerFollowed', (req, res) => student_router.sendLecturerFollowed(req, res));
        //lấy giáo viên đang theo dõi
        app.get('/student/listJobsFollowed', (req, res) => student_router.sendListJobsStudentFollow(req, res));
        //lấy các công việc đang theo dõi
        app.get('/student/planReports', (req, res) => student_router.sendListPlanReport(req, res));
        //lấy về các báo cáo của sinh viên
        app.put('/student/planReports/file', (req, res) => student_router.changeFileInPlanReport(req, res));
        //thay đổi file báo cáo trong planReport
        app.post('/student/PlanReports',jsonParser,(req,res)=> student_router.createNewPlanReport(req,res));
        // tạo mới báo cáo
        app.delete('/student/comments/commentID=:commentID',(req,res)=>student_router.deleteComment(req,res));
        // xóa báo cáo
        app.put('/student/PlanReports',jsonParser,(req,res) =>student_router.updatePlanReport(req,res));
        // cập nhập báo cáo
        app.post('/student/addNewPartnerInfo',jsonParser,(req,res)=> student_router.addNewPartnerInfo(req,res));
        // thêm thông tin công ty không có trong danh sách đối tác
        app.get('/student/workForJob/jobID=:jobID',(req,res)=>student_router.choseJobToWork(req,res))
        


        app.get('/lecturer/getStudentsFollowMe', (req, res) => lecturer_router.getStudentFollowMe(req, res));
        // trả về mảng các sinh viên đã follow
        app.get('/lecturer/action=:action/studentID=:studentID', (req, res) => lecturer_router.acceptStudent(req, res)); //chưa kiểm tra
        // thực hiện hành động accept/deny đối với sinh viên đã đăng kí hướng dẫn, khi giáo viên này đồng ý thì tất cả các yêu cầu khác của sinh viên bị xóa bỏ
        app.get('/lecturer/getListStudent', (req, res) => lecturer_router.getListStudent(req, res));
        // trả về danh sách sinh viên đang hướng dẫn
        app.get('/lecturer/PlanReports/studentID=:studentID',(req,res)=> lecturer_router.sendListPlanReportOfStudent(req,res));
        // trả về các báo cáo thực tập của học sinh có id = studentID
        app.post('/lecturer/PlanReports',jsonParser,(req,res)=> lecturer_router.createNewPlanReport(req,res));
        //tạo một báo cáo mới
        app.put('/lecturer/PlanReports',jsonParser,(req,res) =>lecturer_router.updatePlanReport(req,res));
        //update yêu cầu báo cáo thực tập của sinh viên
        app.delete('/lecturer/planReports/planReportID=:planReportID',(req,res)=>lecturer_router.deletePlanReport(req,res));
        //xóa bỏ planReport
        app.delete('/lecturer/comments/commentID=:commentID',(req,res)=>lecturer_router.deleteComment(req,res));
        app.get('/lecturer/letPointForStudent/planReportID=:planReportID',(req,res)=>lecturer_router.sendPointOfPlanReport(req,res));
        app.put('/lecturer/letPointForStudent/planReportID=:planReportID',jsonParser,(req,res)=>lecturer_router.updatePointOfPlanReport(req,res));
        app.get('/lecturer/getMarkTable',(req,res)=>lecturer_router.sendMarkTable(req,res));
        

        
        




        app.get('/partner/action=:action/jobID=:jobID/studentID=:studentID', (req, res) => partner_router.acceptStudent(req, res));
        // thực hiện hafnnh động accept hoặc deny đối với sinh viên đăng kí job có id = jobID của partner này
        app.get('/partner/getStudentsFollowJob',(req,res)=> partner_router.sendListStudentFollowJobs(req,res));
        // trả về danh sách các sinh viên theo dõi các bài đăng thực tập của partner
        app.get('/partner/listJobByPartner',(req,res)=> partner_router.sendListJobByPartner(req,res))
        // trả về danh sách các bài đăng thực tập
        app.get('/partner/listStudentWorkingForPartner',(req,res)=> partner_router.sendListStudentWorkingForPartner(req,res))
        //trả về danh sách các sinh viên đang thực tập
        app.delete('/partner/Job/jobID=:jobID',(req,res) => partner_router.deleteInternshipJob(req,res));
        //xóa bỏ bài đăng thực tập
        app.post('/partner/createNewJob',jsonParser,(req,res)=> partner_router.createNewJob(req,res));
        //tạo bài đăng thực tập
        app.put('/partner/editJob',jsonParser,(req,res)=>partner_router.editJob(req,res));
        // chỉnh sửa bài đăng thực tập
        app.get('/partner/getTerms',(req,res)=> admin_router.getTerms(req,res));




        app.get('/admin/getTerms', (req, res) => admin_router.getTerms(req, res));
        // lấy thông tin các kì thực tập
        app.post('/admin/createTerm', jsonParser, (req, res) => admin_router.createTerm(req, res));
        //thêm đợt thực tập 
        app.get('/admin/deleteTerm/termID=:termID', (req, res) => admin_router.deleteTerm(req, res));
        //xóa đợt thực tập
        app.put('/admin/updateTerm/termID=:termID', jsonParser, (req, res) => admin_router.updateTerm(req, res));
        //sửa các đợt thực tập
        app.post('/admin/CRUD/account', jsonParser, (req, res) => admin_router.createAccount(req, res)); 
        // tạo account mới 
        app.put('/admin/CRUD/account', jsonParser, (req, res) => admin_router.updateAccount(req, res)); 
        // update account
        app.delete('/admin/CRUD/account/userID=:userID', (req, res) => admin_router.deleteAccount(req, res));
        // delete account
        app.put('/admin/update/profile/userID=:userID',(req,res)=> admin_router.updateProfileForUser(req,res));
        app.get('/admin/changePasswordForUser/userID=:userID/newPassword=:newPassword',(req,res)=> admin_router.change_password_for_user(req,res));
        //cập nhập mật khẩu cho người dùng
        app.get('/admin/partnerInfos',(req,res)=>admin_router.sendListPartnerInfo(req,res))
        //trả về danh sách các công ty được yêu cầu kiểm tra
        app.put('/admin/partnerInfo',jsonParser,(req,res)=> admin_router.updatePartnerInfo(req,res))


        // app.use('**',(req,res)=>{res.status(400); res.send("Server không phục vụ yêu cầu này, vui lòng kiểm tra lại đường dẫn")} );
    }
}