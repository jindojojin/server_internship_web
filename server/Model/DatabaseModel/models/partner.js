/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('partner', {
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
			type: DataTypes.STRING(100),
			allowNull: true,
			unique: true
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true,
			unique: true
		},
		logo: {
			type: DataTypes.STRING(100),
			allowNull: true
		}
	}, {
		tableName: 'partner'
	});
};
