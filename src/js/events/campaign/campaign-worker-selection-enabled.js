/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-worker-details']) {
            context.top.active('view-container-worker-details');
            context.vms['view-container-worker-details'].init({mask: 'details-campaign-worker'});
        }
        context.vms['details-campaign-worker'].init();
    };
};
