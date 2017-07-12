/*jslint node:true, nomen: true */
"use strict";

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    this.manager = options.manager;
}







/*
--------------------------------------------------------------------------------
  REGISTRATION

  POST /api/user

  BODY:
    {
      "fullname": "John Doe",
      "username": "john_is_the_best",
      "password": "amazing_password",
      "type": "master or worker"
    }

  ANSWER: NONE

  APIKey required!
  Content-Type: application/json
*/
Repository.prototype.register = function (user) {

  return this.manager.getRequest()
          .setAPIKey()
          .setMethod("POST")
          .setUrl("/api/user")
          .setBody(user)
          .getCall();
};





/*
--------------------------------------------------------------------------------
  LOGIN

  POST /api/auth

  BODY:
    {
      "username": "john_is_the_best",
      "password": "amazing_password"
    }

  ANSWER:
    {
      "token": "3F2504E0-4F89-11D3-9A0C-0305E82C3301"
    }


  APIKey required!
  Content-Type: application/json
*/
Repository.prototype.login = function (body) {

  return this.manager.getRequest()
          .setAPIKey()
          .setMethod("POST")
          .setUrl("/api/auth")
          .setBody(body)
          .getCall();
};





/*
--------------------------------------------------------------------------------
  LOGOUT

  DELETE /api/auth

  BODY: NONE

  ANSWER: NONE

  APIToken required!
*/
Repository.prototype.logout = function () {

  return this.manager.getRequest()
          .setAPIToken(this._token)
          .setMethod("DELETE")
          .setUrl("/api/auth")
          .getCall();
};




/*
--------------------------------------------------------------------------------
  GET INFORMATION

  GET /api/user/me

  BODY: NONE

  ANSWER:
    {
        "fullname": "John Doe",
        "username": "john_is_the_best",
        "type": "master or worker"
    }

  APIContent-Type: application/jsonToken required!
*/
Repository.prototype.getInfo = function () {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod("GET")
          .setUrl("/api/user/me")
          .getCall();
};





/*
--------------------------------------------------------------------------------
  CHANGE INFORMATION

  PUT /api/user/me

  BODY:
    {
        "fullname": "an optional different fullname",
        "password": "an optional different password"
    }


  ANSWER: NONE

  APIToken required!
  Content-Type: application/json
*/
Repository.prototype.changeInfo = function (user) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod("PUT")
          .setUrl("/api/user/me")
          .setBody(user)
          .getCall();
};



exports.Repository = Repository;
exports.createRepository = Repository;
