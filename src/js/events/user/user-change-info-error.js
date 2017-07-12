/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-change-user-info']) {
            context.top.active('view-container-change-user-info');
            context.vms['view-container-change-user-info'].init({mask: 'form-user-change-info'});
        }
        data = data || {};
        var packet = {
            'Fullname' : data['fullname'],
            'Password-error' : data['password-error']
            ,'Fullname-error' : data['fullname-error']
        };
        context.vms['form-user-change-info'].init({input: packet});
    };
};
