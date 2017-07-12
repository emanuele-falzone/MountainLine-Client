/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['user-logout']();
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
