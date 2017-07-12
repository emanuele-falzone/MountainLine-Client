/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-worker-dashboard']) {
            context.top.active('view-container-worker-dashboard');
        }
        context.vms['view-container-worker-dashboard'].init();
    };
};
