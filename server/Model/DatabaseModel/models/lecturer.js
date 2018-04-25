/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lecturer', {
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
			type: DataTypes.STRING(20),
			allowNull: true
		},
		gmail: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		note: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'lecturer'
	});
};
