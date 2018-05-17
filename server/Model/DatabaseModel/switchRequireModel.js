var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var models = function (type) {
    switch (type) {
        case 'student':
            model = new require('./models/student')(sequelize, Sequelize);
            break;
        case 'lecturer':
            model = new require('./models/lecturer')(sequelize, Sequelize);
            break;
        case 'partner':
            model = new require('./models/partner')(sequelize, Sequelize);
            break;
        case 'admin':
            model = new require('./models/admin')(sequelize, Sequelize);
            break;
        case 'internship_job':
            model = new require('./models/internship_job')(sequelize, Sequelize);
            break;
        case 'account':
            model = new require('./models/account')(sequelize, Sequelize);
            break;
        case 'student_follow_partner':
            model = new require('./models/student_follow_partner')(sequelize, Sequelize);
            break;
        case 'student_follow_job':
            model = new require('./models/student_follow_job')(sequelize, Sequelize);
            break;
        case 'student_follow_lecturer':
            model = new require('./models/student_follow_lecturer')(sequelize, Sequelize);
            break;
        case 'lecturer_student':
            model = new require('./models/lecturer_student')(sequelize, Sequelize);
            break;
        case 'comment' :
            model = new require('./models/comment')(sequelize, Sequelize);
            break;
        case 'file' :
            model = new require('./models/file')(sequelize, Sequelize);
            break;
        case 'message' :
            model = new require('./models/message')(sequelize, Sequelize);
            break;
        case 'plan_report' :
            model = new require('./models/plan_report')(sequelize, Sequelize);
            break;
        case 'skill' :
            model = new require('./models/skill')(sequelize, Sequelize);
            break;
        case 'student_skill' :
            model = new require('./models/student_skill')(sequelize, Sequelize);
            break;
        case 'student_assession' :
            model = new require('./models/student_assession')(sequelize, Sequelize);
            break;
        case 'term' :
            model = new require('./models/term')(sequelize, Sequelize);
            break;
        default:
            return null;
    }
    return model;
}

module.exports = models;