/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'password' : data['Password']
            ,'username' : data['Username']
        };
        var promise = context.actions['user-login']({filters: packet});
        context.runningActionsByContainer['view-container-login'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-login'].splice(
                context.runningActionsByContainer['view-container-login'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
