/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(' planreport', {
		planReportID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		studentID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			references: {
				model: 'student',
				key: 'studentID'
			}
		},
		jobID: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'internship_job',
				key: 'jobID'
			}
		},
		fileID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'file',
				key: 'fileID'
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
		tableName: ' planreport'
	});
};
