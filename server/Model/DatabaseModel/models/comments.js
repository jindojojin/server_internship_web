/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comments', {
		content: {
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		commentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		commenterID: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		planReportID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'plan_report',
				key: 'planReportID'
			}
		}
	}, {
		tableName: 'comments'
	});
};
