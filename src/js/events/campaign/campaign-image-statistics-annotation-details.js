/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-component-image-annotation-statistics']) {
            context.top.active('view-component-image-annotation-statistics');
            context.vms['view-component-image-annotation-statistics'].init({mask: 'details-campaign-image-annotation-statistics'});
        }
        data = data || {};
        var packet = {
            'id' : data['annotation'],
            'canonical' : data['canonical']
        };
        context.vms['details-campaign-image-annotation-statistics'].init({input: packet});
    };
};
