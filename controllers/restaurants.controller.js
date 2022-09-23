const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Restaurants } = require('../models/restaurant.model');
const { Reviews } = require('../models/review.model');

 // Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
dotenv.config({ path: './config.env' });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

// a- Create restaurant - Validator info : name , address , rating . OK
const createRestaurant = catchAsync(async (req, res, next)  => {
	
	const { name , address , rating  } = req.body;

	// Create restaurant
	const newRestaurant = await Restaurants.create({
		name ,
		address,
		rating,
	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newRestaurant },
	});

});

// b- GetAllRestaurant actives . OK
const getAllRestaurant = catchAsync(async (req, res, next) =>{
	
	// Validate if the user exist with given email
	const restaurants = await Restaurants.findAll();

	res.status(200).json({
		status: 'success',
		data: { restaurants },
	});
	

});

// c- getRestaurant for id , OK
const getRestaurant = catchAsync(async (req, res, next) =>{
	
	const { id } = req.params  

	// Validate if the user exist with given email
	const restaurant = await Restaurants.findOne( { where : { id }});

	// If user doesn't exist, send error message
	if (!restaurant) {
		return res.status(404).json({
			status: 'error',
			message: 'restaurant not found',
		});
	}

	res.status(200).json({
		status: 'success',
		data: { restaurant },
	});
	

});

// d- Update :  name and Address 
const updateRestaurant = catchAsync(async (req, res, next)  => {
	
		const { name , address } = req.body;
		const { id } = req.params;

		// Method 1: Update by using the model
		// await User.update({ name }, { where: { id } });

		// Method 2: Update using a model's instance
		const restaurant = await Restaurants.update({ name , address}, { where : { id } } );

		res.status(200).json({
			status: 'success',
			data: { restaurant },
		});

});


// e- Disabled restaurant. Only admin . 
const deleteRestaurant = catchAsync(async (req, res, next)  => {
	
		const { restaurant } = req;

		// Method 1: Delete by using the model
		// User.destroy({ where: { id } })

		// Method 2: Delete by using the model's instance
		// await user.destroy();

		// Method 3: Soft delete
		await restaurant.update({ status: 'deleted' } , { where : { id : restaurant.id  } });
		res.status(204).json({ status: 'success' });


});

// f-  Create reviews : restaurantId , comment and rating . User logged
const createReview = catchAsync(async (req , res, next) =>{
	
		const {  sessionUser , restaurant } = req;
		const { comment , rating } =req.body

		// Create review
		const reviews = await Reviews.create({
			 restaurantId : restaurant.id ,
			 userId : sessionUser.id ,
			 comment,
			 rating
		});

		res.status(200).json({
			status: 'success',
			data: { reviews },
		});
		

});

// g- Update Review :  name and Address .  User logged . OK
const updateReview = catchAsync(async ( req, res, next) =>{
	
		const { sessionUser } = req;
		const { comment , rating } =req.body
		// id of review
		const { id } = req.params

		// Create review
		const reviews = await Reviews.update({

			 comment,
			 rating
		}, 
		{ where : { 
			 id 
			} 
		}
		
		);

		res.status(200).json({
			status: 'success',
			data: { comment , rating },
		});
		
});

// f-  Delete reviews : reviews id - User Logged
const deleteReview = catchAsync(async (req, res, next)  => {
	
		const { review } = req;

		// Method 1: Delete by using the model
		// User.destroy({ where: { id } })

		// Method 2: Delete by using the model's instance
		// await user.destroy();

		// Method 3: Soft delete
		await review.update({ status: 'deleted' } , { where : { id :  review.id } });

		res.status(204).json({ status: 'success' });


});

module.exports = {
	createRestaurant,
	getAllRestaurant,
	getRestaurant, 
	updateRestaurant,
	deleteRestaurant,
	createReview,
	updateReview,
	deleteReview
};
