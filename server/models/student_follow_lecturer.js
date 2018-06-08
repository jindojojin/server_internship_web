/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_follow_lecturer', {
		studentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		lecturerID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'lecturer',
				key: 'account_userID'
			}
		},
		status: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: 'waiting'
		}
	}, {
		tableName: 'student_follow_lecturer'
	});
};
