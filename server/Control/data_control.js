const model_require = require('../Model/DatabaseModel/switchRequireModel')
var path = require('path');
var data_control = {
    route: function (app) {
        app.get('/download/id=:id/:filename', async function (req, res) {
            try {
                let id = parseInt(req.params.id);
                let file = model_require("file");
                let result = await file.findAll({
                    where: { fileID: id },
                    raw: true
                })
                console.log(result);
                res.sendFile(path.resolve('../server' + result[0].path));
            } catch (error) {
                res.status(404);
                res.send();
            }
        })
    }
}

module.exports = data_control;