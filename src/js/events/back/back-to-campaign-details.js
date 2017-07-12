/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-master-dashboard']) {
            context.top.active('view-container-master-dashboard');
        }
        context.vms['view-container-master-dashboard'].init();
    };
};
