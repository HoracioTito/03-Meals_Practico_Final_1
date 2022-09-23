// Models
const { Orders } = require('../models/order.model');
const { Meals } = require('../models/meal.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


/* Control User exists  */
const orderExists = catchAsync(async  (req, res, next) => {
	
	const { id } = req.params;

	// Info : id - name . Exclude password 
	const order = await Orders.findOne({
		where: { id },
	});

	// If user doesn't exist, send error message
	if (!order) {
		return res.status(404).json({
			status: 'error',
			message: 'Order not found',
		});
	}

	// req.anyPropName = 'anyValue'
	req.order = order;
	next();

});


/* Control Meal exists  */
const mealsExists = catchAsync(async  (req, res, next) => {
	
	const { id } = req.params;

	// Info : id - name . Exclude password 
	const meal = await Meals.findOne({
		where: { id },
	});

	// If meal doesn't exist, send error message
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

module.exports = {
	orderExists,
	mealsExists
};
