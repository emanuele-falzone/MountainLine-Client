/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['campaign_images_url']
    // parameters['filename']

    var formData = new FormData();
    formData.append('userPhoto', $('input[type=file]')[0].files[0]);

    this.options.repositories.Images.uploadImage(parameters['campaign_images_url'],formData)

        .then(function (result) {

            $.notify({message: 'Image Uploaded'}, {allow_dismiss: true, type: 'success'});

            solve({
               event: 'campaign-upload-image-done', // Upload Done
               data: {}
            });
        })

        .catch(function (e) {

            $.notify({message: 'Error while uploading image!'}, {allow_dismiss: true, type: 'danger'});
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
