// Models
const { Restaurants } = require('../models/restaurant.model');
const { Reviews } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


/* Control User exists  */
const restaurantExists = catchAsync(async  (req, res, next) => {
	
	const { id  , restaurantId } = req.params;
	
	let idRestaurant 
	if( !id ){
		idRestaurant = restaurantId
	}else{
		idRestaurant = id
	}

	// Info : id - name . Exclude password 
	const restaurant = await Restaurants.findOne({
		where: { id : idRestaurant },
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

const reviewsExists= catchAsync(async  ( req , res , next )=>{
	
	const { id  } = req.params;

	// Info : exists review 
	const review = await Reviews.findOne({
		where: { id },
	});

	// If review doesn't exist, send error message
	if (!review) {
		return res.status(404).json({
			status: 'error',
			message: 'Review not found',
		});
	}

	// req.anyPropName = 'anyValue'
	req.review = review;
	req.user=  { id: review.userId }
	next()

});

module.exports = {
	restaurantExists,
	reviewsExists
};
