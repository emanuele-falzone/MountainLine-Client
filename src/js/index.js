/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    repositories = require('./repositories'),
    controls = require('./controls'),
    events = require('./events'),
    actions = require('./actions'),
    caller = require('./utilities/caller.js'),
    Promise = require('bluebird');

Promise.config({cancellation: true});

controls.register();
// TODO: register any custom control

function ApplicationViewModel() {
    // TODO: initialize global state
    var manager = new caller.Manager();
    var repos = repositories.createRepositories({manager : manager});
    this.context = {
        manager : manager,
        repositories: repos,
        events: events.createEvents({manager : manager}),
        actions: actions.createActions({repositories: repos}),
        vms: {},
        runningActionsByContainer: {}
    };
}

var application = new ApplicationViewModel();

ko.applyBindings(application);

application.context.top.init();
