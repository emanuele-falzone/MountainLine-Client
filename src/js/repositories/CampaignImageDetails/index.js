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

Repository.prototype.findById = function (id) {
    if (id){
        this.id = id;
    }
    return this.options.manager.getRequest()
        .setAPIToken()
        .setMethod('GET')
        .setUrl(this.id)
        .getCall();
};

exports.createRepository = Repository;
