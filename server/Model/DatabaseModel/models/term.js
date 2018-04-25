/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('term', {
		termID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		start: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		end: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false
		}
	}, {
		tableName: 'term'
	});
};
