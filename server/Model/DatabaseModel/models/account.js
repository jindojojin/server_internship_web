/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('account', {
		userID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		nickname: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		salt: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		type: {
			type: DataTypes.STRING(8),
			allowNull: false,
			defaultValue: 'student'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'account'
	});
};
