/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'type' : data['type']
        };
        var promise = context.actions['user-dashboard']({filters: packet});
        context.runningActionsByContainer['view-container-profile'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-profile'].splice(
                context.runningActionsByContainer['view-container-profile'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
