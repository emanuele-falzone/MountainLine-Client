/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-campaign-details']) {
            context.top.active('view-container-campaign-details');
            context.vms['view-container-campaign-details'].init({mask: 'form-campaign-edit-details'});
        }
        data = data || {};
        var packet = {
            'Annotation Replica' : data['annotation_replica']
            ,'Annotation Size' : data['annotation_size']
            ,'Name' : data['name']
            ,'Selection Replica' : data['selection_replica']
            ,'Threshold' : data['threshold']
            ,'campaign_url' : data['id']
        };
        context.vms['form-campaign-edit-details'].init({input: packet});
    };
};
