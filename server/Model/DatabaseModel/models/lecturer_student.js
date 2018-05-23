/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lecturer_student', {
		lecturerID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		studentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		plan_reportID: {
			type: DataTypes.INTEGER(11),
			allowNull: false
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
