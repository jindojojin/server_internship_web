/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('internship_term', {
		termID: {
			type: DataTypes.INTEGER(3),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		termName: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		termInfor: {
			type: DataTypes.STRING(300),
			allowNull: false
		},
		startDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
	}, {
		tableName: 'internship_term'
	});
};
