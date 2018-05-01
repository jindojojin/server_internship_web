var Sequelize = require('sequelize');
var sequelize = require('./sequelize');

var database_update = {
    change_password: async function(username,new_password, new_salt) {
        try {
            let account = require('./models/account');
        let acc = new account(sequelize,Sequelize);
        let result = await acc.update({
            password:new_password,
            salt: new_salt
          }, {
            where: {
              username: username
            }
          });
        return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(false);
        }
        
    }
}

module.exports= database_update;
// database_update.change_password(1,"tranquanglinh","adfasfasdfsafsdfsdfsdfsd").then(r => console.log(r)).catch(e => console.log(e));