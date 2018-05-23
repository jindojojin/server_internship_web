/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('internship_job', {
		jobID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		partnerID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'partner',
				key: 'account_userID'
			}
		},
		termID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'term',
				key: 'termID'
			}
		},
		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		startDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		slot: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		title: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		requirements: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
		salary: {
			type: DataTypes.STRING(200),
			allowNull: false
		}
	}, {
		tableName: 'internship_job'
	});
};
