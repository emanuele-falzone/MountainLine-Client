/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function (options) { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-profile']) {
            context.top.active('view-container-profile');
            context.vms['view-container-profile'].init({mask: 'details-user'});
        }
        data = data || {};
        options.manager.setAPIToken(data['token']);
        context.vms['details-user'].init();
    };
};
