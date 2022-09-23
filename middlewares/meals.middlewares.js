// Models
const { Meals } = require('../models/meal.model');
const { Restaurants } = require('../models/restaurant.model');


// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


/* Control User exists  */
const mealExists = catchAsync(async  (req, res, next) => {
	
	const { id } = req.params;

	// Info : id - name . Exclude password 
	const meal = await Meals.findOne({
		where: { id },
	});

	// If user doesn't exist, send error message
	if (!meal) {
		return res.status(404).json({
			status: 'error',
			message: 'Meal not found',
		});
	}

	// req.anyPropName = 'anyValue'
	req.meal = meal;
	next();

});

/* Control User exists  */
const restaurantExists = catchAsync(async  (req, res, next) => {
	
	const { id } = req.params;

	// Info : id - name . Exclude password 
	const restaurant = await Restaurants.findOne({
		where: { id },
	});

	// If user doesn't exist, send error message
	if (!restaurant) {
		return res.status(404).json({
			status: 'error',
			message: 'restaurant not found',
		});
	}

	// req.anyPropName = 'anyValue'
	req.restaurant = restaurant;
	next();

});


module.exports = {
	mealExists,
	restaurantExists
};
