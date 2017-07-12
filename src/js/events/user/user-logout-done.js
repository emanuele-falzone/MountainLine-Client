/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function (options) { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-login']) {
            context.top.active('view-container-login');
        }
        options.manager.setAPIToken(null);
        context.vms['view-container-login'].init();
    };
};
