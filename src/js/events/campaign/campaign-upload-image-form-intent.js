/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'filename' : data['file_name']
            ,'campaign_images_url' : data['campaign_images_url']
        };
        var promise = context.actions['campaign-upload-image']({filters: packet});
        context.runningActionsByContainer['view-container-upload-image'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-upload-image'].splice(
                context.runningActionsByContainer['view-container-upload-image'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
