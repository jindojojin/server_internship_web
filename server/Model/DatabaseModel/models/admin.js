/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin', {
		adminID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		firtName: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		vnumail: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(20),
			allowNull: false
		}
	}, {
		tableName: 'admin'
	});
};
