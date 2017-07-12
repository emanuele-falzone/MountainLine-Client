/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'line' : data['line']
            ,'session' : data['session']
        };
        var promise = context.actions['worker-send-annotation']({filters: packet});
        context.runningActionsByContainer['view-container-annotation-task-instance'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-annotation-task-instance'].splice(
                context.runningActionsByContainer['view-container-annotation-task-instance'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
