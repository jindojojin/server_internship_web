/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_assession', {
		studentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		assessorID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		comment: {
			type: DataTypes.STRING(500),
			allowNull: false
		}
	}, {
		tableName: 'student_assession'
	});
};
