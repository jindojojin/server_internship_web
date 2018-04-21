var db = require('./DatabaseModel/database_insert');
var se = require('./secure')
function a() {
    var val =[];
    for (var i = 1; i < 5; i++) {
        let userID= "partner"+i.toString();
        let userName = userID +i.toString();
        let salt = se.createSalt();
        let pass= se.encrypt(userName,salt);
        let nickname = userName;
        let permission = 3;
        val.push([userID,userName,pass,nickname,salt,permission]);
    }
    db.insertAccount(val).then( res => console.log(res)).catch( e => console.log(e));
    // let myquery= "INSERT INTO account (userID, username, password, nickname, salt, permission) VALUES ?"
    // let q = new db();
    // q.query(myquery,[val]).then(res=> console.log(res.affectedRows)).catch(e => console.log(e+'')
    // )
}
a();
