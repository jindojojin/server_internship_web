/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin', {
		name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		department: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		vnumail: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		note: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
		account_userID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		logo: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'admin'
	});
};
