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