/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-login']) {
            context.top.active('view-container-login');
            context.vms['view-container-login'].init({mask: 'form-user-login'});
        }
        data = data || {};
        var packet = {
            'Password-error' : data['password-error']
            ,'Username-error' : data['username-error']
        };
        context.vms['form-user-login'].init({input: packet});
    };
};
