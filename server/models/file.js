/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('file', {
		fileID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		fileName: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		path: {
			type: DataTypes.STRING(200),
			allowNull: false
		}
	}, {
		tableName: 'file'
	});
};
