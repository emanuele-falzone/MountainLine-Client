/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'campaign_execution_url' : data['id']
        };
        var promise = context.actions['campaign-terminate-action']({filters: packet});
        context.runningActionsByContainer['view-container-dashboard-master'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-dashboard-master'].splice(
                context.runningActionsByContainer['view-container-dashboard-master'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
