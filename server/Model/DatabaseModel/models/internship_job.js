/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('internship_job', {
		jobID: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		partnerID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			references: {
				model: 'partner',
				key: 'partnerID'
			}
		},
		termID: {
			type: DataTypes.INTEGER(3),
			allowNull: false,
			references: {
				model: 'internship_term',
				key: 'termID'
			}
		}
	}, {
		tableName: 'internship_job'
	});
};
