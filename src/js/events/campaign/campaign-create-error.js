/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-new-campaign']) {
            context.top.active('view-container-new-campaign');
            context.vms['view-container-new-campaign'].init({mask: 'form-campaign-create-new'});
        }
        data = data || {};
        var packet = {
            'Annotation Replica-error' : data['annotaion-replica-error']
            ,'Annotation Size-error' : data['annotation-size-error']
            ,'Name-error' : data['name-error']
            ,'Selection Replica-error' : data['selection-replica-error']
            ,'Threshold-error' : data['threshold-error']
            ,'Name': data['name']
            ,'Selection Replica': data['selection_replica']
            ,'Annotation Replica' : data['annotation_replica']
            ,'Annotation Size' : data['annotation_size']
            ,'Threshold': data['threshold']
            ,'campaign_url': data['campaign_url']
        };
        context.vms['form-campaign-create-new'].init({input: packet});
    };
};
