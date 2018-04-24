/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('commentreport', {
		commentID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'comment',
				key: 'commentID'
			}
		},
		planReportID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			references: {
				model: ' planreport',
				key: 'planReportID'
			}
		}
	}, {
		tableName: 'commentreport'
	});
};
