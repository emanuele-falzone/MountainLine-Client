/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() { // add "options" parameters if needed

}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['type']

    if (parameters.type == 'master'){

        $.notify({message: 'user-dashboard'}, {allow_dismiss: true, type: 'success'});

        solve({
            event: 'dashboard-master-done', // dashboard-master-done
            data: {}
        });

    } else if (parameters.type == 'worker') {

        $.notify({message: 'user-dashboard'}, {allow_dismiss: true, type: 'success'});

        solve({
            event: 'dashboard-worker-done', // dashboard-worker-done
            data: {}
        });

    }

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
