// Load the Mongoose module and Schema object
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Define a new 'UserSchema'
let CustomerSchema = new Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        // Set an email index
        index: true,
        // Validate the email format
        match: /.+\@.+\..+/,
        required: true
    },
   
    password: {
        type: String,
        required: true,
        // Validate the 'password' value length
        validate: [
            (password) => password.length >= 4,
            'Password Should Be Longer'
        ]
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Owner']
    },
    address: String,
    skill: String,
    comment: {
        type: String,
        default:""
    }
  });

// Set the 'fullname' virtual property
CustomerSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Create the 'findOneByUsername' static method
CustomerSchema.statics.findOneByUsername = function(email, callback) {
	// Use the 'findOne' method to retrieve a user document
	this.findOne({
		email: new RegExp(email, 'i')
	}, callback);
};

// Create the 'authenticate' instance method
CustomerSchema.methods.authenticate = function(password) {
	return this.password === password;
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
CustomerSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Customers', CustomerSchema);