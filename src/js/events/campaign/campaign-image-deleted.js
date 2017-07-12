/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-campaign-images']) {
            context.top.active('view-container-campaign-images');
            context.vms['view-container-campaign-images'].init({mask: 'list-campaign-images'});
        }
        context.vms['list-campaign-images'].init();
    };
};
