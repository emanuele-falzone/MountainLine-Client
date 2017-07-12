/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-dashboard-worker']) {
            context.top.active('view-container-dashboard-worker');
        }
        context.vms['view-container-dashboard-worker'].init();
    };
};
