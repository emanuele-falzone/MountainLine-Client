
/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) { // add "options" parameters if needed

    this.options = options;
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['fullname']
    // parameters['password1']
    // parameters['password2']

    if(parameters.password1 == parameters.password2){

        this.options.repositories.User.changeInfo(ko.toJSON({fullname : parameters.fullname,
            password : parameters.password1}))

            .then(function (result) {

                $.notify({message: 'Info Changed!'}, {allow_dismiss: true, type: 'success'});

                solve({
                    event: 'user-change-info-done', // user-change-info-done
                    data: {}
                });

              })

              .catch(function (e) {

                  var eo = JSON.parse(e);

                  $.notify({message: 'Error changing infos!'}, {allow_dismiss: true, type: 'danger'});

                  solve({
                      event: 'user-change-info-error', // user-change-info-error
                      data: {
                          'fullname': parameters.fullname,
                          'fullname-error':  eo.error.fullname,
                          'password-error': eo.error.password,
                      }
                  });

              });

    } else {

        $.notify({message: 'Error changing infos'}, {allow_dismiss: true, type: 'danger'});

        solve({
            event: 'user-change-info-error', // user-change-info-error
            data: {
                'fullname': parameters.fullname,
                'fullname-error': '',
                'password-error': 'Passwords are not equal!',
            }
        });

    }

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
