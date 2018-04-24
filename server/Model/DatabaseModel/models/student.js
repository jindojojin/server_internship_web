/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student', {
		studentID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		lastName: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		class: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		grade: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		},
		majors: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		address: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		vnumail: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		cpa: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		},
		graduationYear: {
			type: "YEAR(4)",
			allowNull: false
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
		},
	}, {
		tableName: 'student'
	});
};
