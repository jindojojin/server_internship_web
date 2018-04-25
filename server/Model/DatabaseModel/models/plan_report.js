/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('plan_report', {
		 plan_reportID: {
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
		file_fileID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		title: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		content: {
			type: DataTypes.STRING(1000),
			allowNull: true
		},
		isFinal: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'plan_report'
	});
};
