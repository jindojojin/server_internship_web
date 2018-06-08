/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('plan_report', {
		planReportID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false
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
			allowNull: true,
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
		},
		deadline: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		isFinal: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'plan_report'
	});
};
