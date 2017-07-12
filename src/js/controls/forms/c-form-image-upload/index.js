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

ViewModel.prototype.id = 'form-image-upload';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'campaign_images_url': this.input['campaign_images_url'],
        'file_name': this.input['file_name'],
    }
    var self = this,
        fields = {
            'campaign_images_url': ko.observable(this.input['campaign_images_url']),
            'file_name': ko.observable(this.input['file_name']),
        },
        errors = {
            'campaign_images_url': ko.observable(this.input['campaign_images_url-error']),
            'file_name': ko.observable(this.input['file_name-error']),
        };
    fields['campaign_images_url'].subscribe(function (value) {
        self.output['campaign_images_url'] = value;
        self.errors()['campaign_images_url'](undefined);
    });
    fields['file_name'].subscribe(function (value) {
        self.output['file_name'] = value;
        self.errors()['file_name'](undefined);
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
    ko.components.register('c-form-image-upload', {
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
