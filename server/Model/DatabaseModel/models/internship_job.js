/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('internship_job', {
		jobID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		partner_account_userID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'partner',
				key: 'account_userID'
			}
		},
		term_termID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'term',
				key: 'termID'
			}
		}
	}, {
		tableName: 'internship_job'
	});
};
