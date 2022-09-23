const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Restaurants } = require('../models/restaurant.model');
const { Meals } = require('../models/meal.model');
const { Orders } = require('../models/order.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
dotenv.config({ path: './config.env' });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

// a- Create Orders: quantity , mealId
const createOrders = catchAsync(async (req, res, next)  => {
	 
	const { quantity , mealId} = req.body;
	const { meal , sessionUser} = req

	const newOrder = await Orders.create({
		quantity , 
		mealId ,
		userId: sessionUser.id,
		totalPrice : ( quantity * meal.price)

	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newOrder },
	});

});


// b- getMeOrders :  user logged 
const getMeOrders = catchAsync(async (req , res, next) =>{
	
	const { sessionUser } = req
	// Select all Orders
	const orders = await Orders.findAll(

		{
		where : { userId : sessionUser.id},
		include: [
			{
				model: Meals,
				include: [{
					model: Restaurants,
					
				}],
			},

		],
	});

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
		

});

// c- updateOrders : active to Completed. User logged
const updateOrders = catchAsync(async (req, res, next)  => {
	
	// const { name , price } = req.body;
	const { order } = req

	// Method 1: Update by using the model
	// await User.update({ name }, { where: { id } });

	// Method 2: Orders using a model's instance
	await order.update({ status : 'completed' } , {  where : { mealId : order.id} } );

	res.status(200).json({
		status: 'success',
		//data: { user },
	});

});


// d- Disabled Orders : active to Cancelled
const deleteOrders = catchAsync(async (req, res, next)  => {
	
	const { order } = req;

	// Method 1: Delete by using the model
	// User.destroy({ where: { id } })

	// Method 2: Delete by using the model's instance
	// await user.destroy();

	// Method 3: Soft delete
	await order.update({ status : 'cancelled' } , {  where : { mealId : order.id} } );

	res.status(204).json({ status: 'success' });


});

module.exports = {
	createOrders,
	getMeOrders,
	updateOrders,
	deleteOrders
};
