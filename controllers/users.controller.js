const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');
const { Orders } = require('../models/order.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
dotenv.config({ path: './config.env' });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command


const createUser = catchAsync(async (req, res, next)  => {
	
	const { username, email, password , role} = req.body;

	// Encrypt the password : generate "salt"
	const salt = await bcrypt.genSalt(12);
	// Password 
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name :  username,
		email,
		password: hashedPassword,
		role
	});

	// Remove password from response - No visible password
	newUser.password = undefined;

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newUser },
	});

});

const updateUser = catchAsync(async (req, res, next)  => {
	
	const { name , password } = req.body;
	const { user } = req;
	
	// Encrypt the password : generate "salt"
	const salt = await bcrypt.genSalt(12);
	// Password 
	const hashedPassword = await bcrypt.hash(password, salt);

	// Method 1: Update by using the model
	// await User.update({ name }, { where: { id } });

	// Method 2: Update using a model's instance
	await user.update({ name , password: hashedPassword } , {  where : { id : user.id } } );

	res.status(200).json({
		status: 'success',
		data: { user },
	});

});

const deleteUser = catchAsync(async (req, res, next)  => {
	
	const { user } = req;

	// Method 1: Delete by using the model
	// User.destroy({ where: { id } })

	// Method 2: Delete by using the model's instance
	// await user.destroy();

	// Method 3: Soft delete
	await user.update({ status: 'deleted' } , { where : { id : { id : user.id } } });

	res.status(204).json({ status: 'success' });

});

/* Get email and password . Control password == password data base */
const loginUser = catchAsync(async (req, res, next)  => {
	
	// Get email and password from req.body
	const { email, password } = req.body;

	// Validate if the user exist with given email
	const user = await User.findOne({
		where: { email, status: 'active' },
	});

	// Compare passwords (entered password vs db password)
	// If user doesn't exists or passwords doesn't match, send error
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(400).json({
			status: 'error',
			message: 'Wrong credentials',
		});
	}

	// Remove password from response
	user.password = undefined;

	// Generate JWT (payload, secretOrPrivateKey, options)
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({
		status: 'success',
		data: { user, token },
	});

});

//* Get all order of user 
const getAllUserOrders= catchAsync(async (req , res, next) =>{
	
	const { sessionUser } = req;

	// Validate if the user exist with given email
	const orders = await Orders.findAll({
		where: { userId : sessionUser.id  },
	});

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
		

});

//* Get order by id  of user
const getUserOrder = catchAsync(async ( req, res, next) =>{
	
	const { sessionUser } = req;

	// Validate if the user exist with given email
	const orders = await Orders.findOne({
		where: { userId : sessionUser.id  },
	});

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
		
});

module.exports = {
	createUser,
	updateUser,
	deleteUser,
	loginUser,
	getAllUserOrders,
	getUserOrder
};
