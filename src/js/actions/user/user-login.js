/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['password']
    // parameters['username']

    this.options.repositories.User.login(ko.toJSON(parameters))

        .then(function (result) {

            $.notify({message: 'Login Done!'}, {allow_dismiss: true, type: 'success'});

            solve({
                event: 'user-login-done', // Login Done
                data: {
                    token : result.token,
                }
            });

        })

        .catch(function (e) {

            var eo = JSON.parse(e);

            $.notify({message: 'Login Failed!'}, {allow_dismiss: true, type: 'danger'});

            solve({
                event: 'user-login-error', // user-login-error
                data: {
                    'password-error': eo.error.password,
                    'username-error': eo.error.username,
                }
            });
        });
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
