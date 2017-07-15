/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-master-dashboard']) {
            context.top.active('view-container-master-dashboard');
            context.vms['view-container-master-dashboard'].init({mask: 'details-campaign'});
        }
        data = data || {};
        var packet = {
            'id' : data['id'],
            'status' : data['status']
        };
        context.vms['details-campaign'].init({input: packet});
    };
};
