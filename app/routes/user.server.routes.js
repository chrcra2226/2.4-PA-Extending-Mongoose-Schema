const users = require('../controllers/user.server.controller');

// Set up the 'users' base routes
module.exports = function(app) {
    // Set up the 'create' base route
    app.route('/users')
        .post(users.create);
};