/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'fullname' : data['Fullname']
            ,'password1' : data['Password']
            ,'password2' : data['Confirm Password']
        };
        var promise = context.actions['user-change-info']({filters: packet});
        context.runningActionsByContainer['view-container-change-user-info'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-change-user-info'].splice(
                context.runningActionsByContainer['view-container-change-user-info'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
