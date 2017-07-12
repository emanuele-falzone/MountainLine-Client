/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-component-image-selection-statistics']) {
            context.top.active('view-component-image-selection-statistics');
            context.vms['view-component-image-selection-statistics'].init({mask: 'details-campaign-image-selection-statistics'});
        }
        data = data || {};
        var packet = {
            'id' : data['statistics']
        };
        context.vms['details-campaign-image-selection-statistics'].init({input: packet});
    };
};
