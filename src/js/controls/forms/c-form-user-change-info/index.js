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

ViewModel.prototype.id = 'form-user-change-info';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'Confirm Password': this.input['Confirm Password'],
        'Fullname': this.input['Fullname'],
        'Password': this.input['Password'],
    }
    var self = this,
        fields = {
            'Confirm Password': ko.observable(this.input['Confirm Password']),
            'Fullname': ko.observable(this.input['Fullname']),
            'Password': ko.observable(this.input['Password']),
        },
        errors = {
            'Confirm Password': ko.observable(this.input['Confirm Password-error']),
            'Fullname': ko.observable(this.input['Fullname-error']),
            'Password': ko.observable(this.input['Password-error']),
        };
    fields['Confirm Password'].subscribe(function (value) {
        self.output['Confirm Password'] = value;
        self.errors()['Confirm Password'](undefined);
    });
    fields['Fullname'].subscribe(function (value) {
        self.output['Fullname'] = value;
        self.errors()['Fullname'](undefined);
    });
    fields['Password'].subscribe(function (value) {
        self.output['Password'] = value;
        self.errors()['Password'](undefined);
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
    ko.components.register('c-form-user-change-info', {
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
