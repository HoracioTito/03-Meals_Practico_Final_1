const express = require('express');
const { body, validationResult } = require('express-validator');

/* Controllers */
const {
	createMeal,
	getAllMeals,
	getMeal,
	updateMeals,
	deleteMeal,
} = require('../controllers/meals.controller');

// Middlewares : ctrl exist id , etc
const { 
	mealExists , 
	restaurantExists
} = require('../middlewares/meals.middlewares');

/* Autentificacion  */
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares'); 

/* Validators */
const {
	createMealsValidators,
} = require('../middlewares/validators.middlewares'); 

const mealsRouter = express.Router();

// b- getAllMeals :  status= active
mealsRouter.get('/',getAllMeals);

// c- getMeal : id meal
mealsRouter.get('/:id',mealExists, getMeal);

/*******************************
 * Protecting below endpoints  *
 ******************************/
 mealsRouter.use(protectSession);

// a- Create meals: id restaurant , userAdmin , name , price 
mealsRouter.post('/:id', restaurantExists ,protectAdmin, createMealsValidators, createMeal); // 50% 

// d- updateMeals :  name and price - User Admin
mealsRouter.patch('/:id', mealExists, protectAdmin, updateMeals); // %0

// e- Disabled meals :  Autorize user admin
mealsRouter.delete('/:id', mealExists, protectAdmin, deleteMeal); // 0%

module.exports = { mealsRouter };
