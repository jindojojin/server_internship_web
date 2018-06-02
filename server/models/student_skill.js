/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_skill', {
		skillID: {
			type: DataTypes.INTEGER(3),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'skill',
				key: 'skillID'
			}
		},
		studentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		level: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		}
	}, {
		tableName: 'student_skill'
	});
};
