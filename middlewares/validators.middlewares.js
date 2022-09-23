
/* Validator  */
const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
		const errorMessages = errors.array().map(err => err.msg);

		const message = errorMessages.join('. ');

		return res.status(400).json({
			status: 'error validator',
			message,
		});
	}

	next();
};


//? **********************
//? *   User Validator   *
//? **********************

/* Validator :  Username - email - Password  */
const createUserValidators = [
	body('username')
		.isString()
		.withMessage('User name must be a string')
		.notEmpty()
		.withMessage('User name cannot be empty')
		.isLength({ min: 4 })
		.withMessage('User name must be at least 4 characters'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
	body('role')
		.isString()
		.withMessage('Role must be a string , normal or admin')
		.notEmpty()
		.withMessage('Role cannot be empty')
		.isLength({ min: 5 })
		.withMessage('Role must be at least 5 characters'),
	checkValidations,
];

/* Validator :  Username - email - Password  */
const updateUserValidators = [
	body('name')
		.isString()
		.withMessage('User name must be a string')
		.notEmpty()
		.withMessage('User name cannot be empty')
		.isLength({ min: 4 })
		.withMessage('User name must be at least 4 characters'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty'),
	checkValidations,
];


//? ****************************
//? *   Restaurant Validator   *
//? ****************************
//TODO : RESTAURANT VALIDATOR 

const createRestaurantValidators = [
	body('name')
		.isString()
		.withMessage('Title must be a string')
		.isLength({ min: 3 })
		.withMessage('Title must be at least 3 characters'),
	body('address')
		.isString()
		.withMessage('Address must be a string')
		.isLength({ min: 10 })
		.withMessage('Address must be at least 10 characters long'),
	body('rating')
		.isNumeric()
		.withMessage('Rating must be a number')

		,	
	checkValidations,
];


//? ************************
//? *   Review Validator   *
//? ************************

 const reviewValidator = [
	body('comment')
		.isString()
		.withMessage('Commnet must be a string')
		.isLength({ min: 3 })
		.withMessage('Comment must be at least 10 characters'),
		body('rating')
		.isNumeric()
		.withMessage('Rating must be a number')
		.isInt({min:0 , max : 10})
		.withMessage('Rating must be between 0 to 10'),
	checkValidations,
]; 

//? ************************
//? *   Meals Validator    *
//? ************************

const createMealsValidators = [
	body('name')
		.isString()
		.withMessage('Commnet must be a string')
		.isLength({ min: 4 })
		.withMessage('Comment must be at least 4 characters'),
		body('price')
		.isNumeric()
		.withMessage('Price must be a number')
		.isInt({min:1 })
		.withMessage('Price must be min 1 '),
	checkValidations,
]; 

const  createOrdersValidators= [
	body('quantity')
	.isNumeric()
	.withMessage('Quantity must be a number')
	.isInt({min:1})
	.withMessage('Quantity must be min 1'),
	body('mealId')
	.isNumeric()
	.withMessage('Rating must be a number')
	.isInt({min:0 , max : 10})
	.withMessage('Meal id  must be min 1'),
	checkValidations,
]; 



//? ************************
//? *   Orders Validator   *
//? ************************


module.exports = { 
	createUserValidators,
	updateUserValidators ,
	createRestaurantValidators,
	createMealsValidators,
	reviewValidator,
	createOrdersValidators

};
