/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-image-details']) {
            context.top.active('view-container-image-details');
        }
        context.vms['view-container-image-details'].init();
    };
};
