/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-upload-image']) {
            context.top.active('view-container-upload-image');
            context.vms['view-container-upload-image'].init({mask: 'form-image-upload'});
        }
        data = data || {};
        var packet = {
            'campaign_images_url' : data['image']
        };
        context.vms['form-image-upload'].init({input: packet});
    };
};
