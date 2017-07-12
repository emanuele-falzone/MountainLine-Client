/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-new-campaign']) {
            context.top.active('view-container-new-campaign');
        }
        context.vms['view-container-new-campaign'].init();
    };
};
