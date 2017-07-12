/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-dashboard-master']) {
            context.top.active('view-container-dashboard-master');
            context.vms['view-container-dashboard-master'].init({mask: 'list-campaigns'});
        }
        context.vms['list-campaigns'].init();
    };
};
