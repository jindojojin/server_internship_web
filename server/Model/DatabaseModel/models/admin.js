/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin', {
		account_userID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		vnumail: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		logo: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'admin'
	});
};
