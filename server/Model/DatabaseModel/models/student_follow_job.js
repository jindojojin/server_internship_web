/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_follow_job', {
		internship_job_jobID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'internship_job',
				key: 'jobID'
			}
		},
		student_account_userID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		status: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: 'waiting'
		}
	}, {
		tableName: 'student_follow_job'
	});
};
