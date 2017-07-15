/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    $ = require('jquery');

exports.register = function () {
    ko.components.register('main-application', {
        viewModel: function(params) {
            var self = this,
                defaultChild = 'view-container-login';
            self.context = params.context;
            self.active = ko.observable(undefined);

            self.landmark = function (id) {
                self.active(id);
                self.context.vms[id].init();
            };
            self.init = function () {
                self.active(defaultChild);
                if (self.context.vms[defaultChild]) {
                    self.context.vms[defaultChild].init();
                }
            };
            self.trigger = function (id) {
                self.context.events[id](self.context, self.output);
            };

            self.context.top = self;
            this.logged  = ko.computed(function() {
                console.log(self.context.manager._APIToken()!=null);
                return self.context.manager._APIToken()!=null;
            }, this);
            this.notLogged  = ko.computed(function() {
                console.log(self.context.manager._APIToken()==null);
                return self.context.manager._APIToken()==null;
            }, this);

        },
        template: require('./index.html'),
        synchronous: true
    });
};
