/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['fullname']
    // parameters['password']
    // parameters['type']
    // parameters['username']

    this.options.repositories.User.register(ko.toJSON(parameters))

        .then(function (result) {

            $.notify({message: 'Registraion Done!'}, {allow_dismiss: true, type: 'success'});

            solve({
                event: 'user-registration-done', // user-registration-done
                data: {
                    'fullname' : parameters.fullname,
                    'type' : parameters.type,
                    'password': parameters.password,
                    'username': parameters.username,
                }
            });

        })
        .catch(function (e) {

            var eo = JSON.parse(e);

            $.notify({message: 'Registraion Failed!'}, {allow_dismiss: true, type: 'danger'});

            solve({
                event: 'user-registration-error', // user-registration-error
                data: {
                    'fullname-error': eo.error.fullname,
                    'fullname' : parameters.fullname,
                    'type' : parameters.type,
                    'password': parameters.password,
                    'password-error': eo.error.password,
                    'type-error': eo.error.type,
                    'username': parameters.username,
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
