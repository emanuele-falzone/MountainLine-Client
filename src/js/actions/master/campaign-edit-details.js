/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['annotation_replica']
    // parameters['annotation_size']
    // parameters['campaign_url']
    // parameters['name']
    // parameters['selection_replica']
    // parameters['threshold']

    var params = {};
    // the type of this parameters should be integer
    params['selection_replica'] = parseInt(parameters['selection_replica']);
    params['annotation_replica'] = parseInt(parameters['annotation_replica']);
    params['annotation_size'] = parseInt(parameters['annotation_size']);
    params['threshold'] = parseInt(parameters['threshold']);
    params['name'] = parameters['name'];


    this.options.repositories.Master.editCampaignInfos(ko.toJSON(params),parameters['campaign_url'])

        .then(function (result) {

            solve({
                event: 'campaign-edit-details-done', // Campaign Details Edited
                data: {}
            });
        })

        .catch(function (e) {

            var eo = JSON.parse(e);

            $.notify({message: 'Error while editing the campaign!'}, {allow_dismiss: true, type: 'danger'});

            solve({
                event: 'campaign-edit-error', // campaign-edit-error
                data: {
                    'name': parameters.name,
                    'selection_replica': parameters.selection_replica,
                    'annotation_replica' : parameters.annotation_replica,
                    'annotation_size' : parameters.annotation_size,
                    'threshold': parameters.threshold,
                    'annotaion-replica-error': eo.error.annotation_replica,
                    'annotation-size-error': eo.error.annotation_size,
                    'name-error': eo.error.name,
                    'selection-replica-error': eo.error.selection_replica,
                    'threshold-error': eo.error.threshold,
                    'campaign_url': parameters.campaign_url
                }
            });
        });
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
