/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

exports.register = function () {


    // -------------------------- VIEW CONTAINERS ------------------------------

    require('./view-containers/c-view-container-register').register();
    require('./view-containers/c-view-container-login').register();
    require('./view-containers/c-view-container-profile').register();
    require('./view-containers/c-view-container-change-user-info').register();

    require('./view-containers/c-view-container-dashboard-master').register();
    require('./view-containers/c-view-container-dashboard-worker').register();

    require('./view-containers/c-view-container-master-dashboard').register();
    require('./view-containers/c-view-container-worker-dashboard').register();

    require('./view-containers/c-view-container-new-campaign').register();
    require('./view-containers/c-view-container-campaign-details').register();

    require('./view-containers/c-view-container-campaign-images').register();
    require('./view-containers/c-view-container-image-details').register();
    require('./view-containers/c-view-container-upload-image').register();

    require('./view-containers/c-view-container-campaign-workers').register();
    require('./view-containers/c-view-container-worker-details').register();

    require('./view-containers/c-view-container-campaign-statistics').register();
    require('./view-containers/c-view-container-image-selection-statistics').register();
    require('./view-containers/c-view-container-image-annotation-statistics').register();

    require('./view-containers/c-view-container-task-statistics').register();
    require('./view-containers/c-view-container-selection-task-instance').register();
    require('./view-containers/c-view-container-annotation-task-instance').register();



    // -------------------------- LIST ---------------------------------------

    require('./lists/c-list-campaigns').register();
    require('./lists/c-list-campaign-images').register();
    require('./lists/c-list-campaign-workers').register();
    require('./lists/c-list-campaign-image-statitics').register();

    require('./lists/c-list-tasks').register();



    // -------------------------- DETAILS ---------------------------------------

    require('./details/c-details-user').register();

    require('./details/c-details-campaign').register();
    require('./details/c-details-campaign-image').register();
    require('./details/c-details-campaign-worker').register();

    require('./details/c-details-campaign-statistics').register();
    require('./details/c-details-campaign-image-selection-statistics').register();
    require('./details/c-details-campaign-image-annotation-statistics').register();

    require('./details/c-details-task').register();
    require('./details/c-details-task-statistics').register();



    // -------------------------- FORM ---------------------------------------

    require('./forms/c-form-user-login').register();
    require('./forms/c-form-user-registration').register();
    require('./forms/c-form-user-change-info').register();

    require('./forms/c-form-campaign-create-new').register();
    require('./forms/c-form-campaign-edit-details').register();

    require('./forms/c-form-image-upload').register();

    require('./forms/c-form-image-annotation').register();
    require('./forms/c-form-image-selection').register();



    // -------------------------- CUSTOM CONTROLS ---------------------------------------

    require('./customs/line-drawer').register();

    require('./customs/main-application').register();


};
