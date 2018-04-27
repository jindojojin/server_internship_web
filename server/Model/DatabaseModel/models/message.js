/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('message', {
		senderID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		receiverID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
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
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		status: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'unread'
		}
	}, {
		tableName: 'message'
	});
};
