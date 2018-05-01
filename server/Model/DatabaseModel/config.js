var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('internship_web', 'root', '');

auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});

// With options:
// var auto = new SequelizeAuto('database', 'user', 'pass', {
//     host: 'localhost',
//     dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
//     directory: false, // prevents the program from writing to disk
//     additional: {
//         timestamps: false
//         //...
//     },
//     tables: ['table1', 'table2', 'table3']
//     //...
// })