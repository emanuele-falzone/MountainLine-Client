/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-campaign-images']) {
            context.top.active('view-container-campaign-images');
            context.vms['view-container-campaign-images'].init({mask: 'list-campaign-images'});
        }
        data = data || {};
        var packet = {
            'url' : data['image']
        };
        context.vms['list-campaign-images'].init({input: packet});
    };
};
