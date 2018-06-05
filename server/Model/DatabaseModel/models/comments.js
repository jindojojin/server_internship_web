/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comments', {
		planReportID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'plan_report',
				key: 'planReportID'
			}
		},
		content: {
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		commenterID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		}
	}, {
		tableName: 'comments'
	});
};
