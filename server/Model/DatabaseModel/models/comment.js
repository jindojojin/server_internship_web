/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment', {
		commentID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		content: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
		account_userID: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		 plan_report_ plan_reportID: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'comment'
	});
};
