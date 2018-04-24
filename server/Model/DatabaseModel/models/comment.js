/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment', {
		commentID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		content: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
		userID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			references: {
				model: 'account',
				key: 'userID'
			}
		}
	}, {
		tableName: 'comment'
	});
};
