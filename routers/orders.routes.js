const express = require('express');
const { body, validationResult } = require('express-validator');

/* Controllers */
const {
	createOrders,
	getMeOrders,
	updateOrders,
	deleteOrders
} = require('../controllers/orders.controller');

// Middlewares : ctrl exist id , etc
const { 
	orderExists ,
	mealsExists
} = require('../middlewares/orders.middlewares');

/* Autentificacion  */
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares'); 

/* Validators */
const {
	createOrdersValidators,
} = require('../middlewares/validators.middlewares');

const ordersRouter = express.Router();

/*******************************
 * Protecting below endpoints  *
 ******************************/
 ordersRouter.use(protectSession);

// a- Create Orders: quantity , mealId
ordersRouter.post('/:id', createOrdersValidators, mealsExists, createOrders); // 50% 

// b- getMeOrders :  user logged 
ordersRouter.get('/me',getMeOrders); //, protectUsersAccount

// c- updateOrders : active to Completed. User logged
ordersRouter.patch('/:id', orderExists,  updateOrders); // %0

// d- Disabled Orders : active to Canceled
ordersRouter.delete('/:id', orderExists, deleteOrders); // 0%

module.exports = { ordersRouter };
