/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-selection-task-instance']) {
            context.top.active('view-container-selection-task-instance');
            context.vms['view-container-selection-task-instance'].init({mask: 'form-image-selection'});
        }
        data = data || {};
        var packet = {
            'image' : data['image']
            ,'session' : data['session']
            ,'size' : data['size']
            ,'type' : data['type']
        };
        context.vms['form-image-selection'].init({input: packet});
    };
};
