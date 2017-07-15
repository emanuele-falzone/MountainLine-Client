/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['worker_annotation_url']

    this.options.repositories.Master.disableWorkerAnnotation(parameters['worker_annotation_url'])

        .then(function (result) {

            $.notify({message: 'Annotation Disabled!'}, {allow_dismiss: true, type: 'success'});

            solve({
                event: 'campaign-worker-annotation-disabled', // campaign-worker-annotation-disabled
                data: {}
            });
        })

        .catch(function (e) {

            $.notify({message: 'You can\'t disable annotation!'}, {allow_dismiss: true, type: 'warning'});
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
