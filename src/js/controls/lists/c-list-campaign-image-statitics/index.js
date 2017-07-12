/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['CampaignImageStatistics'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
        self.trigger.call(this, 'campaign-image-statistics-annotation-details');
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'list-campaign-image-statitics';

ViewModel.prototype.fields = {
    id: 1
    ,'annotation': 1
    ,'canonical' : 1
};

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;
    var fie = this.filters;
    this._computing = this._repository.find(this.filters, this.fields).then(function (items) {
        var quelloGiusto = [];

        var arrayLength = items.length;
        for (var i = 0; i < arrayLength; i++) {
            var temp = {};
            temp.id = i+1;

            temp.canonical = fie.canonical;
            temp.annotation = items[i];
            quelloGiusto.push(temp);
        }

        self.selected(undefined);
        self.items(quelloGiusto);
        if (items.length) {
            self.selected(quelloGiusto[0]);
            self.output = quelloGiusto[0];
        }
        self.status('computed');
        self._computing = undefined;
    });
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.filters = options.input || {};
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
    ko.components.register('c-list-campaign-image-statitics', {
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
