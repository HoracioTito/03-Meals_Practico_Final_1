const express = require('express');

// Routers
const { usersRouter } = require('./routers/users.routes');
const { restaurantsRouter } = require('./routers/restaurants.routes');
const { mealsRouter } = require('./routers/meals.routes');
const { ordersRouter } =  require('./routers/orders.routes')

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Enable Express app to receive JSON data
const app = express();
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

// Global error handler
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
