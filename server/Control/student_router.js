var student_model = require('../Model/studentModel')
var student_router = {
    follow: async function (req, res) {
        let studentID = parseInt(req.cookies.userID);
        console.log(studentID);
        let action = req.params.action;
        let target = req.params.target;
        let targetID = parseInt(req.params.targetID);
        switch (action) {
            case 'follow':
                student_model.follow(studentID, target, targetID).then(r => {
                    res.status(201);
                    res.send();
                }).catch(e => {
                    console.log(e);
                    res.status(500);
                    res.send();
                });
                break;
            case 'unfollow':
                student_model.unfollow(studentID, target, targetID).then(r => {
                    res.status(201);
                    res.send();
                }).catch(e => {
                    console.log(e);
                    res.status(500);
                    res.send();
                });
                break;
            default: {
                res.status(400);//bad request
                res.send();
                break;
            }

        };
    },
}

// console.log(parseInt('1234f45'));
module.exports = student_router;