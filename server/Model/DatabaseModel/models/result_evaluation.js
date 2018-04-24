/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('result_evaluation', {
		studentID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'student',
				key: 'studentID'
			}
		},
		fileID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		lecturerID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'lecturer',
				key: 'lecturerID'
			}
		},
		point: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		},
		comment: {
			type: DataTypes.STRING(1000),
			allowNull: false
		}
	}, {
		tableName: 'result_evaluation'
	});
};
