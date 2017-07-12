/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {

        // -------------------------- USER -------------------------------------
        'user-register': require('./user/user-register').createAction(options),
        'user-login': require('./user/user-login').createAction(options),
        'user-logout': require('./user/user-logout').createAction(options),

        'user-change-info': require('./user/user-change-info').createAction(options),
        'user-dashboard': require('./user/user-dashboard').createAction(options),


        // -------------------------- MASTER -----------------------------------
        'campaign-create-new': require('./master/campaign-create-new').createAction(options),
        'campaign-edit-details': require('./master/campaign-edit-details').createAction(options),

        'campaign-start-action': require('./master/campaign-start-action').createAction(options),
        'campaign-terminate-action': require('./master/campaign-terminate-action').createAction(options),

        'campaign-image-delete': require('./master/campaign-image-delete').createAction(options),
        'campaign-upload-image': require('./master/campaign-upload-image').createAction(options),

        'worker-enable-selection': require('./master/worker-enable-selection').createAction(options),
        'worker-enable-annotation': require('./master/worker-enable-annotation').createAction(options),
        'worker-disable-selection': require('./master/worker-disable-selection').createAction(options),
        'worker-disable-annotation': require('./master/worker-disable-annotation').createAction(options),

        // -------------------------- WORKER -----------------------------------
        'worker-start-session': require('./worker/worker-start-session').createAction(options),
        'worker-send-selection': require('./worker/worker-send-selection').createAction(options),
        'worker-send-annotation': require('./worker/worker-send-annotation').createAction(options)
    };
};
