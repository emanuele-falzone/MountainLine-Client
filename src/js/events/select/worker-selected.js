/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-worker-details']) {
            context.top.active('view-container-worker-details');
            context.vms['view-container-worker-details'].init({mask: 'details-campaign-worker'});
        }
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        context.vms['details-campaign-worker'].init({input: packet});
    };
};
