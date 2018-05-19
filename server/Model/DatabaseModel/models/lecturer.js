/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lecturer', {
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
			type: DataTypes.STRING(15),
			allowNull: true
		},
		note: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		logo: {
			type: DataTypes.TEXT,
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
		}
	}, {
		tableName: 'lecturer'
	});
};
