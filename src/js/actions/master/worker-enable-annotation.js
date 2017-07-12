/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['worker_annotation_url']

    this.options.repositories.Master.enableWorkerSelection(parameters['worker_annotation_url'])

    .then(function (result) {

        $.notify({message: 'Annotation Enabled'}, {allow_dismiss: true, type: 'success'});

        solve({
            event: 'campaign-worker-annotation-enabled', // campaign-worker-annotation-enabled
            data: {}
        });
    })

    .catch(function (e) {

        $.notify({message: 'Error while enabling annotation!'}, {allow_dismiss: true, type: 'danger'});
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
