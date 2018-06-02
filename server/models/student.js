/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student', {
		name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		studentCode: {
			type: DataTypes.STRING(8),
			allowNull: false
		},
		class: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		grade: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		majors: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		gpa: {
			type: DataTypes.STRING(5),
			allowNull: true
		},
		graduationYear: {
			type: "YEAR(4)",
			allowNull: true
		},
		vnumail: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		skypeID: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		facebook: {
			type: DataTypes.STRING(100),
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
			type: DataTypes.STRING(500),
			allowNull: true
		},
		orientation: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		note: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		logo: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		account_userID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'account',
				key: 'userID'
			}
		}
	}, {
		tableName: 'student'
	});
};
