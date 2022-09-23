// Models Tables
const { User } = require('./user.model');
const { Restaurants } = require('./restaurant.model');
const { Meals } = require('./meal.model');
const { Orders } = require('./order.model');
const { Reviews } = require('./review.model');

const initModels = () => {
	// 1 Meals <----> 1 Order
	Meals.hasOne (Orders, { foreignKey: 'mealId' });
	Orders.belongsTo(Meals);

	// 1 Restaurant  <----> M Meals
	Restaurants.hasMany(Meals, { foreignKey: 'restaurantId' });
	Meals.belongsTo(Restaurants);

	// 1 Restaurant <----> M Reviews
	Restaurants.hasMany(Reviews, { foreignKey: 'restaurantId' });
	Reviews.belongsTo(Restaurants);

	// 1 User <----> M Reviews
	User.hasMany(Reviews, { foreignKey: 'userId' });
	Reviews.belongsTo(User);

	// 1 User <----> M Reviews
	User.hasMany(Orders, { foreignKey: 'userId' });
	Orders.belongsTo(User);

};

module.exports = { initModels };
