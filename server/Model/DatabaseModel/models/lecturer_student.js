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
		studentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		plan_reportID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'plan_report',
				key: ' plan_reportID'
			}
		},
		mark: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		comment: {
			type: DataTypes.STRING(200),
			allowNull: true
		}
	}, {
		tableName: 'lecturer_student'
	});
};
