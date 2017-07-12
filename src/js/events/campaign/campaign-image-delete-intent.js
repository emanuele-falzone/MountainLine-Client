/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'image_url' : data['id']
        };
        var promise = context.actions['campaign-image-delete']({filters: packet});
        context.runningActionsByContainer['view-container-campaign-images'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-campaign-images'].splice(
                context.runningActionsByContainer['view-container-campaign-images'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
