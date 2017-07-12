/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}

    //---------------------------- CREATED WITH IFML ---------------------------
    repositories['CampaignImageStatistics'] = require('./CampaignImageStatistics').createRepository(options);
    repositories['CampaignImages'] = require('./CampaignImages').createRepository(options);
    repositories['Campaigns'] = require('./Campaigns').createRepository(options);
    repositories['Tasks'] = require('./Tasks').createRepository(options);
    repositories['CampaignDetails'] = require('./CampaignDetails').createRepository(options);
    repositories['UserDetails'] = require('./UserDetails').createRepository(options);
    repositories['TaskStatistics'] = require('./TaskStatistics').createRepository(options);
    repositories['TaskDetails'] = require('./TaskDetails').createRepository(options);
    repositories['CampaignImageSelectionStatistics'] = require('./CampaignImageSelectionStatistics').createRepository(options);
    repositories['CampaignImageDetails'] = require('./CampaignImageDetails').createRepository(options);
    repositories['CampaignStatistics'] = require('./CampaignStatistics').createRepository(options);
    repositories['CampaignWorkers'] = require('./CampaignWorkers').createRepository(options);
    repositories['CampaignWorkerDetails'] = require('./CampaignWorkerDetails').createRepository(options);

    //---------------------------- CUSTOM0 -------------------------------------
    repositories['User'] = require('./User').createRepository(options);
    repositories['Master'] = require('./Master').createRepository(options);
    repositories['Images'] = require('./Images').createRepository(options);
    repositories['Worker'] = require('./Worker').createRepository(options);
    return repositories;
};
