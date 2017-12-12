'use strict';

var User = require('../controllers/usersServer-controller')

module.exports = function(app) {
    app.route('/api/user')
        .get (User.allUsers)
        .post(User.userInsert)
        .put (User.userUpdate)
    app.route('/api/user/login')
        .post(User.userLogin)
    app.route('/api/user/:id')
        .delete(User.userDelete)
}
