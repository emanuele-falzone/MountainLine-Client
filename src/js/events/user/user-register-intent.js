/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'fullname' : data['Fullname']
            ,'password' : data['Password']
            ,'type' : data['Type']
            ,'username' : data['Username']
        };
        var promise = context.actions['user-register']({filters: packet});
        context.runningActionsByContainer['view-container-register'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-register'].splice(
                context.runningActionsByContainer['view-container-register'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
