/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['type']

    this.options.repositories.User.getInfo()

        .then(function (result) {

            if (result.type == 'master'){

                $.notify({message: 'Dashboard Loaded!'}, {allow_dismiss: true, type: 'success'});

                solve({
                    event: 'dashboard-master-done', // dashboard-master-done
                    data: {}
                });

            } else if (result.type == 'worker') {

                $.notify({message: 'Dashboard Loaded!'}, {allow_dismiss: true, type: 'success'});

                solve({
                    event: 'dashboard-worker-done', // dashboard-worker-done
                    data: {}
                });

            } else {
                $.notify({message: 'Failed loading dashboard!'}, {allow_dismiss: true, type: 'danger'});
            }

        })

        .catch(function (e) {

            $.notify({message: 'Failed loading dashboard!'}, {allow_dismiss: true, type: 'danger'});

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
