/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student_follow_partner', {
		studentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		partnerID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'partner',
				key: 'account_userID'
			}
		}
	}, {
		tableName: 'student_follow_partner'
	});
};
