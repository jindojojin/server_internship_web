var models = function(type){
    switch (type) {
        case 'student':
            model= require('./models/student');
            break;
        case 'lecturer':
            model = require('./models/lecturer');
            break;
        case 'partner':
            model = require('./models/partner');
            break;
        case 'admin':
            model = require('./models/admin');
            break;
        default:
            return null;
    }
    return model;
}

module.exports = models;