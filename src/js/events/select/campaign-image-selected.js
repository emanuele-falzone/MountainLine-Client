/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-image-details']) {
            context.top.active('view-container-image-details');
            context.vms['view-container-image-details'].init({mask: 'details-campaign-image'});
        }
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        context.vms['details-campaign-image'].init({input: packet});
    };
};
