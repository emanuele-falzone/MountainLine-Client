/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['image_url']

    this.options.repositories.Images.deleteImage(parameters['image_url'])

        .then(function (result) {

            $.notify({message: 'Image deleted!'}, {allow_dismiss: true, type: 'success'});

            solve({
                event: 'campaign-image-deleted', // campaign-image-deleted
                data: {}
            });
        })

        .catch(function (e) {

            $.notify({message: 'You can\'t delete this image!'}, {allow_dismiss: true, type: 'danger'});
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
