var student_model = require('../Model/studentModel')
var student_router = {
    follow: async function (req, res) {
        let action = req.params.action;
        let target = req.params.target;
        let targetID = parseInt(req.params.targetID);
        switch (action) {
            case 'follow':
                student_model.follow(target, targetID).then(r => res.send(r)).catch(e => res.send(e));
                break;
            case 'unfollow':
                student_model.unfollow(target, targetID).then(r => res.send(r)).catch(e => res.send(e));
                break;
            default:
                res.send(false)
                break;
        };
    },
}

// console.log(parseInt('1234f45'));
module.exports = student_router;