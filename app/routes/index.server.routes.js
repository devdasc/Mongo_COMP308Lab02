// Load the 'index' controller
let index = require('../controllers/index.server.controller');

// Define the routes module' method
module.exports = function (app) {

	// Mount the 'index' controller's 'render' method
    app.get('/', index.render);

    //renders sign-up.ejs if a get request is made to /sign-up path
    app.get('/signup', index.renderSignup);

    //renders login.ejs if a get request is made to /login path
    app.get('/login', index.renderLogin);
  
};