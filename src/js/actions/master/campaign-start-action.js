/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['campaign_execution_url']

    this.options.repositories.Master.startCampaign(parameters['campaign_execution_url']+'/execution')

        .then(function (result) {

            $.notify({message: 'Campaign Started'}, {allow_dismiss: true, type: 'success'});

            solve({
                event: 'campaign-started', // campaign-started
                data: {}
            });
        })

        .catch(function (e) {

            $.notify({message: 'Error while starting campaign!'}, {allow_dismiss: true, type: 'danger'});
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
