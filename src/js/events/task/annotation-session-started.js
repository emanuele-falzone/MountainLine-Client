/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-annotation-task-instance']) {
            context.top.active('view-container-annotation-task-instance');
            context.vms['view-container-annotation-task-instance'].init({mask: 'form-image-annotation'});
        }
        data = data || {};
        var packet = {
            'image' : data['image']
            ,'session' : data['session']
            ,'size' : data['size']
            ,'type' : data['type']
        };
        context.vms['form-image-annotation'].init({input: packet});
    };
};
