/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-register']) {
            context.top.active('view-container-register');
            context.vms['view-container-register'].init({mask: 'form-user-registration'});
        }
        data = data || {};
        var packet = {
          'Fullname' : data['fullname']
          ,'Password' : data['password']
          ,'Type' : data['type']
          ,'Username' : data['username']
            ,'Fullname-error' : data['fullname-error']
            ,'Password-error' : data['password-error']
            ,'Type-error' : data['type-error']
            ,'Username-error' : data['username-error']
        };
        context.vms['form-user-registration'].init({input: packet});
    };
};
