/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-campaign-workers']) {
            context.top.active('view-container-campaign-workers');
            context.vms['view-container-campaign-workers'].init({mask: 'list-campaign-workers'});
        }
        data = data || {};
        var packet = {
            'url' : data['worker']
        };

        context.vms['list-campaign-workers'].init({input: packet});
    };
};
