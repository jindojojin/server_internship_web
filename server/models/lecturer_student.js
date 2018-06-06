/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lecturer_student', {
		lecturerID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'lecturer',
				key: 'account_userID'
			}
		},
		mark: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		},
		comment: {
			type: DataTypes.STRING(500),
			allowNull: true
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
		tableName: 'lecturer_student'
	});
};
