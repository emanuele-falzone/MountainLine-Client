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
  return this.options.manager.getRequest()
          .setAPIToken()
          .setMethod('GET')
          .setUrl('/api/task')
          .getCall('tasks');
};

exports.createRepository = Repository;
