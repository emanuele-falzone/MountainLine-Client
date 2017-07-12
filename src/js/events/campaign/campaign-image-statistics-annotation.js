/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data ) {
        if (!context.vms['view-component-image-annotation-statistics']) {
            context.top.active('view-component-image-annotation-statistics');
            context.vms['view-component-image-annotation-statistics'].init({mask: 'list-campaign-image-statitics'});
        }
        data = data || {};
        var packet = {
            'id' : data['statistics'],
            'canonical' : data['canonical']
        };

        context.vms['list-campaign-image-statitics'].init({input: packet});
    };
};
