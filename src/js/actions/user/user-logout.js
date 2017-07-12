/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:

    this.options.repositories.User.logout()

        .then(function (result) {

            $.notify({message: 'Logout Done!'}, {allow_dismiss: true, type: 'success'});

            solve({
                event: 'user-logout-done', // user-logout-done
                data: {}
            });

        })

        .catch(function (e) {

            $.notify({message: 'Logout Failed!'}, {allow_dismiss: true, type: 'danger'});
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
