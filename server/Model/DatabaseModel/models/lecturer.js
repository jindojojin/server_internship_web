/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lecturer', {
		lecturerID: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		vnumail: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		gmail: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		note: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'lecturer'
	});
};
