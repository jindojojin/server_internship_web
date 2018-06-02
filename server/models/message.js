/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('message', {
		messageID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		senderID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		receiverID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		title: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		content: {
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		status: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'unread'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'message'
	});
};
