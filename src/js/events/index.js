/*jslint node: true, nomen: true */
"use strict";


exports.createEvents = function (options) {
    return {

        // -------------------------- USER -------------------------------------

        'user-register-intent': require('./user/user-register-intent').createEvent(options),
        'user-registration-done': require('./user/user-registration-done').createEvent(options),
        'user-registration-error': require('./user/user-registration-error').createEvent(options),

        'user-change-info-form-intent': require('./user/user-change-info-form-intent').createEvent(options),
        'user-change-info-intent': require('./user/user-change-info-intent').createEvent(options),
        'user-change-info-done': require('./user/user-change-info-done').createEvent(options),
        'user-change-info-error': require('./user/user-change-info-error').createEvent(options),

        'user-login-intent': require('./user/user-login-intent').createEvent(options),
        'user-login-done': require('./user/user-login-done').createEvent(options),
        'user-login-error': require('./user/user-login-error').createEvent(options),

        'user-logout-intent': require('./user/user-logout-intent').createEvent(options),
        'user-logout-done': require('./user/user-logout-done').createEvent(options),

        'dashboard-intent': require('./user/dashboard-intent').createEvent(options),
        'dashboard-master-done': require('./user/dashboard-master-done').createEvent(options),
        'dashboard-worker-done': require('./user/dashboard-worker-done').createEvent(options),



        // -------------------------- CAMPAIGN -------------------------------------

        'campaign-create-new-form-intent': require('./campaign/campaign-create-new-form-intent').createEvent(options),
        'campaign-create-new-intent': require('./campaign/campaign-create-new-intent').createEvent(options),
        'campaign-create-new-done': require('./campaign/campaign-create-new-done').createEvent(options),
        'campaign-create-error': require('./campaign/campaign-create-error').createEvent(options),

        'campaign-start': require('./campaign/campaign-start').createEvent(options),
        'campaign-started': require('./campaign/campaign-started').createEvent(options),
        'campaign-terminate': require('./campaign/campaign-terminate').createEvent(options),
        'campaign-terminated': require('./campaign/campaign-terminated').createEvent(options),

        'campaign-images-intent': require('./campaign/campaign-images-intent').createEvent(options),
        'campaign-edit-details-intent': require('./campaign/campaign-edit-details-intent').createEvent(options),
        'campaign-manage-workers': require('./campaign/campaign-manage-workers').createEvent(options),

        'campaign-statistics': require('./campaign/campaign-statistics').createEvent(options),
        'campaign-image-statistics-selection': require('./campaign/campaign-image-statistics-selection').createEvent(options),
        'campaign-image-statistics-annotation': require('./campaign/campaign-image-statistics-annotation').createEvent(options),
        'campaign-image-statistics-annotation-details': require('./campaign/campaign-image-statistics-annotation-details').createEvent(options),

        'campaign-image-delete-intent': require('./campaign/campaign-image-delete-intent').createEvent(options),
        'campaign-image-deleted': require('./campaign/campaign-image-deleted').createEvent(options),

        'campaign-upload-image-form-intent': require('./campaign/campaign-upload-image-form-intent').createEvent(options),
        'campaign-upload-image-intent': require('./campaign/campaign-upload-image-intent').createEvent(options),
        'campaign-upload-image-done': require('./campaign/campaign-upload-image-done').createEvent(options),

        'campaign-edit-details-form-intent': require('./campaign/campaign-edit-details-form-intent').createEvent(options),
        'campaign-edit-details-done': require('./campaign/campaign-edit-details-done').createEvent(options),
        'campaign-edit-error': require('./campaign/campaign-edit-error').createEvent(options),

        'campaign-worker-enable-selection': require('./campaign/campaign-worker-enable-selection').createEvent(options),
        'campaign-worker-enable-annotation': require('./campaign/campaign-worker-enable-annotation').createEvent(options),

        'campaign-worker-disable-selection': require('./campaign/campaign-worker-disable-selection').createEvent(options),
        'campaign-worker-disable-annotation': require('./campaign/campaign-worker-disable-annotation').createEvent(options),

        'campaign-worker-selection-enabled': require('./campaign/campaign-worker-selection-enabled').createEvent(options),
        'campaign-worker-selection-disabled': require('./campaign/campaign-worker-selection-disabled').createEvent(options),

        'campaign-worker-annotation-enabled': require('./campaign/campaign-worker-annotation-enabled').createEvent(options),
        'campaign-worker-annotation-disabled': require('./campaign/campaign-worker-annotation-disabled').createEvent(options),



        // -------------------------- TASK -------------------------------------

        'task-session-annotation-finished': require('./task/task-session-annotation-finished').createEvent(options),
        'task-session-selection-finished': require('./task/task-session-selection-finished').createEvent(options),

        'task-statistics': require('./task/task-statistics').createEvent(options),

        'task-start-session': require('./task/task-start-session').createEvent(options),
        'selection-session-started': require('./task/selection-session-started').createEvent(options),
        'annotation-session-started': require('./task/annotation-session-started').createEvent(options),

        'worker-send-annotation-form': require('./task/worker-send-annotation-form').createEvent(options),
        'worker-send-selection-form': require('./task/worker-send-selection-form').createEvent(options),

        'selection-next': require('./task/selection-next').createEvent(options),
        'selection-accept': require('./task/selection-accept').createEvent(options),
        'selection-reject': require('./task/selection-reject').createEvent(options),

        'annotation-next': require('./task/annotation-next').createEvent(options),
        'annotation-save': require('./task/annotation-save').createEvent(options),



        // -------------------------- BACK -------------------------------------

        'back-to-campaign-image-details': require('./back/back-to-campaign-image-details').createEvent(options),
        'back-to-dashboard-master-details': require('./back/back-to-dashboard-master-details').createEvent(options),
        'back-to-dashboard-master-list': require('./back/back-to-dashboard-master-list').createEvent(options),
        'back-to-dashboard': require('./back/back-to-dashboard').createEvent(options),
        'back-to-camapign-worker-list': require('./back/back-to-camapign-worker-list').createEvent(options),
        'back-to-campaign-details': require('./back/back-to-campaign-details').createEvent(options),
        'back-to-dashboard-worker': require('./back/back-to-dashboard-worker').createEvent(options),
        'back-to-image-details': require('./back/back-to-image-details').createEvent(options),
        'back-to-campaign-images': require('./back/back-to-campaign-images').createEvent(options),



        // -------------------------- SELECTED -------------------------------------

        'campaign-selected': require('./select/campaign-selected').createEvent(options),
        'campaign-image-selected': require('./select/campaign-image-selected').createEvent(options),
        'worker-selected': require('./select/worker-selected').createEvent(options),
        'task-selected': require('./select/task-selected').createEvent(options),
    };
};
