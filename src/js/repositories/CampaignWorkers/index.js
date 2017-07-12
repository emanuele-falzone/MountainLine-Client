/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    this.options = options;
}

Repository.prototype.find = function (fields, project) {
    if (fields.url) {
      this.url = fields.url;
    }
    return this.options.manager.getRequest()
        .setAPIToken()
        .setMethod('GET')
        .setUrl(this.url)
        .getCall('workers');
};

exports.createRepository = Repository;
