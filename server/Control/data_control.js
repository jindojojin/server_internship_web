
var path = require('path');
var data_control = {
    route: function (app) {
        app.get('/download/:filename:id', function (req, res) {
            res.sendFile(path.resolve('../server/Data/Student/reportData/CTDT Dai hoc CNTT chuan 2015.doc'));
        })
    }
}

module.exports = data_control;