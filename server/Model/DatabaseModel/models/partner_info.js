/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('partner_info', {
		partner_infoID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(111),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(111),
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
		operatorAddress: {
			type: DataTypes.STRING(222),
			allowNull: false
		},
		internshipAddress: {
			type: DataTypes.STRING(222),
			allowNull: false
		},
		internGuideName: {
			type: DataTypes.STRING(222),
			allowNull: false
		},
		internGuidePhoneNumber: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
		internGuideEmail: {
			type: DataTypes.STRING(111),
			allowNull: false
		},
		requesterID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'student',
				key: 'account_userID'
			}
		},
		status: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: 'waiting'
		},
		shortDescribe: {
			type: DataTypes.STRING(2000),
			allowNull: false
		}
	}, {
		tableName: 'partner_info'
	});
};
