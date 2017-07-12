/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-task-statistics']) {
            context.top.active('view-container-task-statistics');
            context.vms['view-container-task-statistics'].init({mask: 'details-task-statistics'});
        }
        data = data || {};
        var packet = {
            'id' : data['statistics']
        };
        context.vms['details-task-statistics'].init({input: packet});
    };
};
