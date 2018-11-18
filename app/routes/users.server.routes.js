// Load the 'users' controller
let users = require('../../app/controllers/users.server.controller');

// Define the routes module' method
module.exports = function (app) {  
    
    //route to display all users
    app.route('/display').get(users.display);     
    
    // Set up the 'users' parameterized routes 
    app.route('/users/:userId').get(users.read).put(users.update)
    
    // Set up the 'userId' parameter middleware
    app.param('userId', users.userById);
    
    //route to sign-up.ejs page
    app.route('/signup').post(users.register);

    //route to feedback.ejs page
    app.route('/feedback').post(users.customerFeedbackByEmail);
};