const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Meals } = require('../models/meal.model');
const { Orders } = require('../models/order.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
dotenv.config({ path: './config.env' });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

// a- Create meals: id restaurant : name , price
const createMeal = catchAsync(async (req, res, next) => {
	
		const { name, price } = req.body;
		const { id } = req.params

		const newMeal = await Meals.create({
			name ,
			price,
			restaurantId : id
		});

		// 201 -> Success and a resource has been created
		res.status(201).json({
			status: 'success',
			data: { newMeal },
		});

});


// b- getAllMeals :  status= active
const getAllMeals = catchAsync(async (req , res, next) =>{21
	

		// Select all meals
		const meals = await Meals.findAll({ where : { status : "active" } });

		res.status(200).json({
			status: 'success',
			data: { meals },
		});
		

});

// c- getMeal : id meal
const getMeal = catchAsync(async (req , res, next) =>{
	
        const { id } = req.params
		// Select all meals
		const meal = await Meals.findOne({ where : { id } });

		res.status(200).json({
			status: 'success',
			data: { meal },
		});

});


// d- updateMeals :  name and price - User Admin
const updateMeals = catchAsync(async (req, res, next)  => {
	
		const { name , price } = req.body;
		const { meal } = req
	
		// Method 1: Update by using the model
		// await User.update({ name }, { where: { id } });

		// Method 2: Meals using a model's instance
		await meal.update({ name , price} , {  where : { id : meal.id} } );

		res.status(200).json({
			status: 'success',
			//data: { user },
		});

});


// e- Disabled meals :  Autorize user admin
const deleteMeal = catchAsync(async (req, res, next)  => {
	
		const { meal } = req;

		// Method 1: Delete by using the model
		// User.destroy({ where: { id } })

		// Method 2: Delete by using the model's instance
		// await user.destroy();

		// Method 3: Soft delete
		await meal.update({ status: 'deleted' } , { where : { id : { id : meal.id } } });

		res.status(204).json({ status: 'success' });


});



module.exports = {
	createMeal,
	getAllMeals,
	getMeal,
	updateMeals,
	deleteMeal,
};
