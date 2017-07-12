/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'accepted' : data['selected']
            ,'session' : data['session']
        };
        var promise = context.actions['worker-send-selection']({filters: packet});
        context.runningActionsByContainer['view-container-selection-task-instance'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-selection-task-instance'].splice(
                context.runningActionsByContainer['view-container-selection-task-instance'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
