/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_skill', {
		studentID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'studentID'
			}
		},
		skillID: {
			type: DataTypes.INTEGER(3),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'skill',
				key: 'skillID'
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
