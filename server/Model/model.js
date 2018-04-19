var db = require('./database');
var se = require('./secure')
function a() {
    var val =[];
    for (var i = 16020000; i < 16029999; i++) {
        let userID= i.toString();
        let userName = i.toString();
        let salt = se.createSalt();
        let pass= se.encrypt(userName,salt);
        let nickname = userName;
        let permission = 4
        val.push([userID,userName,pass,nickname,salt,permission]);
    }
    let myquery= "INSERT INTO account (userID, username, password, nickname, salt, permission) VALUES ?"
    let q = new db();
    q.query(myquery,[val]).then(res=> console.log(res.affectedRows)).catch(e => console.log(e+'')
    )
}
a();
