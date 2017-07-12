
function Manager(){

    this._APIKey = '4ce5200c-5283-4591-9710-e4427efbc514';

    var _Request = function(APIKey, APIToken){
      this._server = "http://awt.westus.cloudapp.azure.com";
      this._APIKey = APIKey;
      this._APIToken = APIToken;

      this._parameters = {
        crossDomain: true,
        contentType: "application/json; charset=UTF-8"
      };

      this.setMethod = function(method){
        this._parameters['method'] = method;
        return this;
      };

      this.setBody = function(body){
        this._parameters['data'] = body;
        return this;
      };

      this.setUrl = function(url){
        this._parameters['url'] = this._server + url;
        return this;
      };

      this.setAPIKey = function(){
        self = this;
        this._parameters['beforeSend'] = function(request){
            request.setRequestHeader('Authorization','APIKey ' + self._APIKey);
            request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        }
        return this;
      };
      this.setAPIToken = function(){
        self = this;
        this._parameters['beforeSend'] = function(request){
            request.setRequestHeader('Authorization', 'APIToken ' + self._APIToken);
            request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        }
        return this;
      };

      this.forFile = function(){
        this._parameters['method'] = 'POST';
        this._parameters['enctype'] = 'multipart/form-data';
        this._parameters['processData'] = false;
        this._parameters['contentType'] = false;
        this._parameters['cache'] = false;
        return this;
      };

      this.getName=function(){
        return this._parameters
      };

      this.getCall = function(index) {
        // console.log("APIKey " + this._APIKey);
        // console.log("APIToken " + this._APIToken);
        self = this;
        return new Promise(function (resolve, reject) {
          $.ajax(self._parameters)
            .done(function (result) {
              if(index){
                resolve(result[index]);
              }else{
                resolve(result);
              }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
              /*
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
              var error = new Error(errorThrown);
              error.textStatus = textStatus;
              error.jqXHR = jqXHR;
              error.errors = jqXHR.responseJSON.errors;
              */
              //console.log(jqXHR.responseText);
              reject(jqXHR.responseText);
            });
          });
      }
    };

    this.setAPIToken = function(APIToken) {
      this._APIToken = APIToken;
      console.log("APIToken " + APIToken);
    };

    this.getAPIToken = function(){
      return this._APIToken;
    };

    this.getRequest = function(){
      return new _Request(this._APIKey, this._APIToken);
    };

};

exports.Manager = Manager;
