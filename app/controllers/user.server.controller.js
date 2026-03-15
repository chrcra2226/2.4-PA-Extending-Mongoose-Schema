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