/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('partner', {
		partnerID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		logo: {
			type: DataTypes.STRING(100),
			allowNull: false
		}
	}, {
		tableName: 'partner'
	});
};
