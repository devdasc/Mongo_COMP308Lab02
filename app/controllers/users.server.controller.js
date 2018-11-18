// Load the 'User' Mongoose model
let Customer = require('mongoose').model('Customers');

// 'create' controller method to create a new user
exports.register = function (req, res, next) {
    // Create a new instance of the 'User' Mongoose model
    let user = new Customer(req.body);

    // Use the 'User' instance's 'save' method to save a new user document
    user.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
           // return console.error(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('login', {
            title:'Login',error:''});
        }
        
    });
};

exports.customerFeedbackByEmail = function (req,res,next) {
    let email = req.body.email;
    let password = req.body.password;
    
    Customer.findOne({ email: email, password: password },(err, user)=> {
        console.log(email);
        console.log(password);
        if (err) {
            return next(err);
         } else {
            if (user == null || user == undefined) {
                res.render('login', {
                    title: 'Login', error: 'Wrong Username or password'
                });
            } else {
                req.user = user;
                let jUser = JSON.parse(JSON.stringify(user));
                console.log(jUser);
                res.render('feedback', {
                    title: 'Customer Feedback',
                    user: jUser
                });
            }
            next();
        }
    });

};
//method to find a user by id
exports.userById = function (req, res, next, id) {
    Customer.findOne({ id: id }, (err, user) => {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            console.log(user);
            next();
        }
    })

};
//read the controller method and display a user
exports.read = function (req, res) {
    res.JSON(req.user);
};
//update the user based on id
exports.update = function (req, res, next) {
    req.user = req.body;
    console.log(req.user);
    Customer.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
        if (err) {
            return next(err);
        } else {
            res.render('thankyou',
                {
                    title: 'Thank You',
                    user:req.user
                });
            next();
        }
    });
};
//display all users in a tabular format
exports.display = function (req, res, next) {
    Customer.find({}, (err, users) => {
        if (err) {
            return next(err);
        } else {
            res.render('user-feedback',{
                title: 'List of All Users',
                users: users
            });
        }
    });

};
  

