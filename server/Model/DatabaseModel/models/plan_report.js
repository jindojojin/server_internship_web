/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('plan_report', {
		title: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		planReportID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		studentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		jobID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'internship_job',
				key: 'jobID'
			}
		},
		fileID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'plan_report'
	});
};
