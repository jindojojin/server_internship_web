/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('message', {
		senderID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		receiverID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		title: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		content: {
			type: DataTypes.STRING(1000),
			allowNull: false
		}
	}, {
		tableName: 'message'
	});
};
