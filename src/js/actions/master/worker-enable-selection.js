/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['worker_selection_url']

    this.options.repositories.Master.enableWorkerSelection(parameters['worker_selection_url'])

        .then(function (result) {

            $.notify({message: 'Selection Enabled'}, {allow_dismiss: true, type: 'success'});

            solve({
                event: 'campaign-worker-selection-enabled', // campaign-worker-selection-enabled
                data: {}
            });
        })

        .catch(function (e) {

            $.notify({message: 'You can\'t enable selection!'}, {allow_dismiss: true, type: 'warning'});
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
