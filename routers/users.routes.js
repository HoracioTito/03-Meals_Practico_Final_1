const express = require('express');
const { body, validationResult } = require('express-validator');

/* Controllers */
const {
	createUser,
	updateUser,
	deleteUser,
	loginUser,
	getAllUserOrders,
	getUserOrder
} = require('../controllers/users.controller'); 

// Middlewares : ctrl exist id , etc
const { userExists,orderExists} = require('../middlewares/users.middlewares');

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
	updateUserValidators
} = require('../middlewares/validators.middlewares'); 


/* Users Routers */
const usersRouter = express.Router();

// a- Create user - Validator info : name , email , password . OK
usersRouter.post('/signup', createUserValidators, createUser); // 50% 

// b-  Login user send : mail and password . OK
usersRouter.post('/login', loginUser); // 0%

/*******************************
 * Protecting below endpoints  *
 ******************************/
usersRouter.use(protectSession);

// c- Update :  name and email . User logined . OK
usersRouter.patch('/:id',updateUserValidators, userExists, protectUsersAccount, updateUser); // %0

// d- Disabled user count . Autorize user admin . OK
usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser); // 0%

// e- Orders of user: user session . //TODO OK
usersRouter.get('/orders',getAllUserOrders); //  protectOrdersOwners, 

// f- Orders of user : id user session . OK
usersRouter.get('/orders/:id',orderExists,getUserOrder); //  protectOrdersOwners

module.exports = { usersRouter };
