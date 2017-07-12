/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['view-container-campaign-statistics']) {
            context.top.active('view-container-campaign-statistics');
            context.vms['view-container-campaign-statistics'].init({mask: 'details-campaign-statistics'});
        }
        data = data || {};
        var packet = {
            'id' : data['statistics']
        };

        context.vms['details-campaign-statistics'].init({input: packet});
    };
};
