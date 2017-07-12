/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-campaign-workers']) {
            context.top.active('view-container-campaign-workers');
        }
        context.vms['view-container-campaign-workers'].init();
    };
};
