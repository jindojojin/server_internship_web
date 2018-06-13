/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_follow_job', {
		student_follow_jobID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		jobID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'internship_job',
				key: 'jobID'
			}
		},
		studentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		status: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: 'waiting'
		},
		otherPartnerID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'partner_info',
				key: 'partner_infoID'
			}
		}
	}, {
		tableName: 'student_follow_job'
	});
};
