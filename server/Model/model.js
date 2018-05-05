var db = require('./DatabaseModel/database_insert');
var db_q = require('./DatabaseModel/database_query');
var se = require('./secure')
function a() {
    var val =[];
    for (var i = 1; i <= 30; i++) {
        let userName ='partner'+i.toString();
        let salt = se.createSalt();
        let pass= se.encrypt(userName,salt);
        let nickname = userName;
        let type = 'partner';
        val.push({username:userName,password:pass,nickname:nickname,salt:salt,type:type});
    }
    db.insertAccount(val).then( res => console.log("da them thanh cong")).catch( e => console.log("that bai"));
    // let myquery= "INSERT INTO account (userID, username, password, nickname, salt, permission) VALUES ?"
    // let q = new db();
    // q.query(myquery,[val]).then(res=> console.log(res.affectedRows)).catch(e => console.log(e+'')
    // )
}
// a(); sinh du lieu account cho database;

function b(){
    let val=[];
    let arr = db_q.getUserByType('student');
    arr.then( arrayOfType =>{
        let listProfile=[];
        arrayOfType.forEach(user => {
            listProfile.push({name: user.nickname,account_userID: user.userID,vnumail:user.username+'@vnu.edu.vn',studentCode:user.nickname});
        });
        db.insertProfile(listProfile,'student').then(
            r => console.log("thành công")
        )
        .catch(e => console.log("that bai"))
    })
}
// b();  //sinh du liêu profile cho account có trong bảng account( nếu chưa được thêm trước đó)
