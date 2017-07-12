/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['session']
    // parameters['type']

    var options = this.options;

    options.repositories.Worker.startSession(parameters['session'])

        .then(function (result) {

            if (parameters.type == "selection"){

                $.notify({message: 'Selection Session Started'}, {allow_dismiss: true, type: 'success'});

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

            } else if (parameters.type == "annotation") {

                $.notify({message: 'Annotation Session Started'}, {allow_dismiss: true, type: 'success'});

                options.repositories.Worker.getNextTask(parameters['session'])

                    .then(function (result) {

                        $.notify({message: 'Next Loaded'}, {allow_dismiss: true, type: 'success'});

                        result['session'] = parameters['session'];

                        solve({
                            event: 'annotation-next', // Next
                            data: result
                        });

                    })

                    .catch(function (e) {

                        $.notify({message: 'Session Finished'}, {allow_dismiss: true, type: 'success'});

                        solve({
                            event: 'task-session-annotation-finished', // Finished
                            data: {
                                'session': parameters['session'],
                            }
                        });

                    });
            }
        })

        .catch(function (e) {

              $.notify({message: 'PROBLEM'}, {allow_dismiss: true, type: 'danger'});
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
