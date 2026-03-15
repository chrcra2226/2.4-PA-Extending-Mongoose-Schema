const User = require('mongoose').model('User');

// Create a new controller method that creates new 'User' documents
exports.create = async function(req, res) {
    const user = new User(req.body);
    await user.save()
    .then((response) => {
        console.log('Value of response: ' + response);
        res.status(200).send("User Added");
    })
    .catch((error) => {
        console.error('Could not save user: ' + error);
    });
};

//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new 'UserSchema'
const UserSchema = new Schema({
    // Use a string expression to validate the 'firstName' field
    firstName: String,
    // Use a string expression to validate the 'lastName' field
    lastName: String,
    // Use a string expression to validate the 'email' field
    email: String,
    // Use a string expression to validate the 'username' field
    username: {
        type: String, 
        trim: true 
    },
    // Use a string expression to validate the 'username' field
    password: String,
    // Use a default value for the 'created' field
    created: {
        type: Date,
        default: Date.now
    },
    // Use a setter to prefix the protocol
    website: {
        type: String,
        set: function(url) {
            // If the URL is missing the http:// prefix, prepend it
            if (!url) {
                return url;
            } else {
                // Check if the URL starts with 'http://' or 'https://'
                if (url.indexOf('http://') !== 0 && 
                    url.indexOf('https://') !== 0) {
                        url = 'http://' + url;
                    }
                // Return the modified URL
                return url;
            }
        }
    },
    // Use a getter to prefix the protocol
    website: {
        type: String,
        get: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && 
                    url.indexOf('https://') !== 0) {
                        url = 'http://' + url;
                    }
                return url;
            }
        }
    }
});
// Set the 'toJSON' schema option to include virtuals
UserSchema.set('toJSON', { getters: true });

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);