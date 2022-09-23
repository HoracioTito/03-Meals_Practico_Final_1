// Models
const { User } = require('../models/user.model');
const { Orders } = require('../models/order.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

/* Control User exists  */
const userExists = catchAsync(async  (req, res, next) => {
	
	const { id } = req.params;

	// Info : id - name . Exclude password 
	const user = await User.findOne({
		attributes: { exclude: ['password'] },
		where: { id },
	});

	// If user doesn't exist, send error message
	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	// req.anyPropName = 'anyValue'
	req.user = user;
	next();

});

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
module.exports = {
	userExists,
	orderExists
};
