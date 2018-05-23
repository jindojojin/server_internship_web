const Sequelize = require('sequelize');
// const acc = require('./models/account')
var sequelize = new Sequelize('internship_web', 'root', '00000', {
        host: 'localhost',
        // port:'3306',
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
        logging: false
    })

    module.exports = sequelize;
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