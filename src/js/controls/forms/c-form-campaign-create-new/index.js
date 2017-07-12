/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'form-campaign-create-new';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'Annotation Replica': this.input['Annotation Replica'],
        'Annotation Size': this.input['Annotation Size'],
        'Name': this.input['Name'],
        'Selection Replica': this.input['Selection Replica'],
        'Threshold': this.input['Threshold'],
    }
    var self = this,
        fields = {
            'Annotation Replica': ko.observable(this.input['Annotation Replica']),
            'Annotation Size': ko.observable(this.input['Annotation Size']),
            'Name': ko.observable(this.input['Name']),
            'Selection Replica': ko.observable(this.input['Selection Replica']),
            'Threshold': ko.observable(this.input['Threshold']),
        },
        errors = {
            'Annotation Replica': ko.observable(this.input['Annotation Replica-error']),
            'Annotation Size': ko.observable(this.input['Annotation Size-error']),
            'Name': ko.observable(this.input['Name-error']),
            'Selection Replica': ko.observable(this.input['Selection Replica-error']),
            'Threshold': ko.observable(this.input['Threshold-error']),
        };
    fields['Annotation Replica'].subscribe(function (value) {
        self.output['Annotation Replica'] = value;
        self.errors()['Annotation Replica'](undefined);
    });
    fields['Annotation Size'].subscribe(function (value) {
        self.output['Annotation Size'] = value;
        self.errors()['Annotation Size'](undefined);
    });
    fields['Name'].subscribe(function (value) {
        self.output['Name'] = value;
        self.errors()['Name'](undefined);
    });
    fields['Selection Replica'].subscribe(function (value) {
        self.output['Selection Replica'] = value;
        self.errors()['Selection Replica'](undefined);
    });
    fields['Threshold'].subscribe(function (value) {
        self.output['Threshold'] = value;
        self.errors()['Threshold'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-form-campaign-create-new', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
