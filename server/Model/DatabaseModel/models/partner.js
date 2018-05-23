/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('partner', {
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			unique: true
		},
		phoneNumber: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true,
			unique: true
		},
		email2: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		note: {
			type: DataTypes.STRING(300),
			allowNull: false
		},
		logo: {
			type: DataTypes.STRING(100),
			allowNull: true
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
		tableName: 'partner'
	});
};
