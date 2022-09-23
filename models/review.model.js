const { db, DataTypes } = require('../utils/database.util');

const Reviews = db.define('reviews', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	restaurantId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "active"
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
});

module.exports = { Reviews };
