/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['selected']
    // parameters['session']

    var options = this.options;

    options.repositories.Worker.sendCurrentResult( parameters['session'],ko.toJSON({accepted : parameters['selected']}))

        .then(function (result) {

            options.repositories.Worker.getNextTask(parameters['session'])

                .then(function (result) {

                    $.notify({message: 'Next Loaded'}, {allow_dismiss: true, type: 'success'});

                    result['session'] = parameters['session'];

                    solve({
                        event: 'selection-next', // Next
                        data: result
                    });

                })

                .catch(function (e) {

                    $.notify({message: 'Session Finished'}, {allow_dismiss: true, type: 'success'});

                    solve({
                        event: 'task-session-selection-finished', // Finished
                        data: {
                            'session': parameters['session'],
                        }
                    });
                });

        })
        .catch(function (e) {

            $.notify({message: 'Session Finished'}, {allow_dismiss: true, type: 'success'});

            solve({
                event: 'task-session-selection-finished', // Finished
                data: {
                    'session': parameters['session'],
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
