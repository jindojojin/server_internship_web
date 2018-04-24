/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('file', {
		fileID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		fileName: {
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		fileType: {
			type: DataTypes.STRING(5),
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
