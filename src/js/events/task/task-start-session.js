/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'session' : data['session'],
              'type' : data['type']
        };
        var promise = context.actions['worker-start-session']({filters: packet});
        context.runningActionsByContainer['view-container-worker-dashboard'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-worker-dashboard'].splice(
                context.runningActionsByContainer['view-container-worker-dashboard'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
