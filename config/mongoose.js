// Load the module dependencies
let config = require('./config');
let mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	let db = mongoose.connect(config.db);

	// Load the 'User' model 
	require('../app/models/user.server.model');

	// Return the Mongoose connection instance
	return db;
};