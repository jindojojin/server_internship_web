const Sequelize = require('sequelize');
// const acc = require('./models/account')
var db = new Sequelize('internship_web', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            // max: 5,
            // min: 0,
            // acquire: 30000,
            // idle: 10000
        },
        define: {
            freezeTableName: true,
            timestamps: false,
        },
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false,
    })

    module.exports = db;
//  var account = new acc(sequelize,Sequelize);
//  sequelize.sync();
// account.create({
//     userID: '17021031',
//     username:'Linh',
//     password: 'abcsdfasfasfasfasf',
//     nickname: 'jin',
//     salt:'dfasdfhiasudhfkasdhfksajdhfkasjd'
// }).then().catch( e => console.log(e)
// );