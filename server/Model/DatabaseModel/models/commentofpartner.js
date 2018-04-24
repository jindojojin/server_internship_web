/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('commentofpartner', {
		studentID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'studentID'
			}
		},
		partnerID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'partner',
				key: 'partnerID'
			}
		},
		jobID: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'internship_job',
				key: 'jobID'
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
		tableName: 'commentofpartner'
	});
};
