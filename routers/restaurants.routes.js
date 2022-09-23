const express = require('express');
const { body, validationResult } = require('express-validator');

/* Controllers */

const {
	createRestaurant,
	getAllRestaurant,
	getRestaurant,
	updateRestaurant,
	deleteRestaurant,
	createReview,
	updateReview,
	deleteReview
} = require('../controllers/restaurants.controller');

// Middlewares : ctrl exist id , etc
const {
	restaurantExists ,
	reviewsExists
} = require('../middlewares/restaurants.middlewares');

/* Autentificacion   */
/* Autentificacion Protect  */
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
	protectOrdersOwners
} = require('../middlewares/auth.middlewares'); 


/* Validators */
const {
	createUserValidators,
	updateUserValidators ,
	createRestaurantValidators,
	reviewValidator
} = require('../middlewares/validators.middlewares'); 

const restaurantsRouter = express.Router();

// a- Create restaurant - Validator info : name , address , rating . OK
restaurantsRouter.post('/', createRestaurantValidators, createRestaurant); // 50% 

// b- GetAllRestaurant actives . OK
restaurantsRouter.get('/', getAllRestaurant);

// c- getRestaurant for id. OK
restaurantsRouter.get('/:id', getRestaurant);


/*******************************
 * Protecting below endpoints  *
 ******************************/
 restaurantsRouter.use(protectSession);

// d- Update :  name and Address . Only Admin . OK
restaurantsRouter.patch('/:id', restaurantExists, protectAdmin, updateRestaurant); // %0

// e- Disabled restaurant. Only admin . OK
restaurantsRouter.delete('/:id', restaurantExists, protectAdmin, deleteRestaurant); // 0%

// f-  Create reviews : restaurantId , comment and rating . User logged . OK
restaurantsRouter.post('/reviews/:restaurantId', restaurantExists, reviewValidator  , createReview); // 0%

// g- Update Review :  name and Address .  User logged . OK
restaurantsRouter.patch('/reviews/:id', reviewsExists, reviewValidator , protectUsersAccount  , updateReview); // %0

// h-  Delete reviews : reviews id - User Logged , OK
restaurantsRouter.delete('/reviews/:id', reviewsExists,  protectUsersAccount , deleteReview); // 0%

module.exports = { restaurantsRouter };
