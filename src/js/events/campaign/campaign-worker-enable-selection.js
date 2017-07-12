/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'worker_selection_url' : data['selection']
        };
        var promise = context.actions['worker-enable-selection']({filters: packet});
        context.runningActionsByContainer['view-container-worker-details'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-worker-details'].splice(
                context.runningActionsByContainer['view-container-worker-details'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
