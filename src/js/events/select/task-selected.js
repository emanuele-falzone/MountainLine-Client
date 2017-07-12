/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-worker-dashboard']) {
            context.top.active('view-container-worker-dashboard');
            context.vms['view-container-worker-dashboard'].init({mask: 'details-task'});
        }
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        context.vms['details-task'].init({input: packet});
    };
};
