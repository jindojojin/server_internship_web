/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('skill', {
		skillID: {
			type: DataTypes.INTEGER(3),
			allowNull: false,
			primaryKey: true
		},
		skillName: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		detail: {
			type: DataTypes.STRING(200),
			allowNull: true
		}
	}, {
		tableName: 'skill'
	});
};
