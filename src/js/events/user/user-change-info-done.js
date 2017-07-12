/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-profile']) {
            context.top.active('view-container-profile');
            context.vms['view-container-profile'].init({mask: 'details-user'});
        }
        context.vms['details-user'].init();
    };
};
