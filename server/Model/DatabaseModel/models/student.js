/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student', {
		account_userID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		class: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		grade: {
			type: DataTypes.INTEGER(2),
			allowNull: true
		},
		majors: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		vnumail: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		cpa: {
			type: DataTypes.INTEGER(2),
			allowNull: true
		},
		graduationYear: {
			type: "YEAR(4)",
			allowNull: true
		},
		picture: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		skypeID: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		facebook: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		position: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		favorite: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		orientation: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		note: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'student'
	});
};
