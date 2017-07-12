/*jslint node: true, nomen: true */
"use strict";

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    this.manager = options.manager;
}






/*
--------------------------------------------------------------------------------
  GET CURRENT USER'S CAMPAIGNS

  GET /api/campaign

  BODY: NONE

  ANSWER:
    {
        "campaigns": [
            {
                "id": "URL OF THE CAMPAIGN",
                "name": "NAME OF THE CAMPAIGN",
                "status": "THE STATUS OF THE CAMPAIGN (ready, started, ended)"
            }
        ]
    }

  APIToken required!
*/
Repository.prototype.getCampaigns = function (APIToken) {

  return this.manager.getRequest()
          .setAPIToken(APIToken)
          .setMethod('GET')
          .setUrl('/api/campaign')
          .getCall(this,
                function(self,result){
                    self.db.remove({}, { multi: true }, function (err, numRemoved) {});
                    self.db.insert(result.campaigns);
                  });
};





/*
--------------------------------------------------------------------------------
  CREATE NEW CAMPAIGN FOR THE CURRENT USER

  POST /api/campaign

  BODY:
    {
        "name": "NAME OF THE CAMPAIGN",
        "selection_replica": 123,
        "threshold": 45,
        "annotation_replica": 67,
        "annotation_size": 8
    }

  ANSWER: Location Header with the url of the new resource

  APIToken required!
  Content-Type: application/json
*/
Repository.prototype.createNewCampaign = function (parameters) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('POST')
          .setUrl('/api/campaign')
          .setBody(parameters)
          .getCall();

};



/*
--------------------------------------------------------------------------------
  GET CAMPAIGN INFORMATION

  GET <<campaign url>>

  BODY: NONE

  ANSWER:
    {
        "id": "campaign url",
        "name": "NAME OF THE CAMPAIGN",
        "status": "THE STATUS OF THE CAMPAIGN (ready, started, ended)",
        "selection_replica": "SELECTION REPLICA OF THE CAMPIAGN",
        "threshold": "THRESHOLD TO ENABLE AN IMAGE FOR ANNOTATION",
        "annotation_replica": "ANNOTATION REPLICA OF THE CAMPAIGN",
        "annotation_size": "ANNOTATION SIZE OF THE CAMPAIGN",
        "image": "campaign images url",
        "worker": "campaign workers url",
        "execution": "campaign execution state url",
        "statistics": "campaign statistics url"
    }

  APIToken required!
*/
Repository.prototype.getCampaignInfos = function (APIToken,url) {

  return this.manager.getRequest()
          .setAPIToken(APIToken)
          .setMethod('GET')
          .setUrl(url)
          .getCall();
};






/*
--------------------------------------------------------------------------------
  EDIT THE CAMPAIGN

  PUT <<campaign url>>

  BODY:
    {
        "name": "NAME OF THE CAMPAIGN",
        "selection_replica": 123,
        "threshold": 45,
        "annotation_replica": 67,
        "annotation_size": 8
    }

  (ANSWER: Location Header with the url of the new resource)

  (APIToken required!)
  Content-Type: application/json
*/
Repository.prototype.editCampaignInfos = function (body,url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('PUT')
          .setUrl(url)
          .setBody(body)
          .getCall();

};





/*
--------------------------------------------------------------------------------
  START THE CAMPAIGN

  POST <<campaign execution url>>

  BODY: NONE

  ANSWER: NONE

  APIToken required!

*/
Repository.prototype.startCampaign = function (campaign_execution_url, APIToken) {

  return this.manager.getRequest()
          .setAPIToken(APIToken)
          .setMethod('POST')
          .setUrl(campaign_execution_url)
          .getCall();

};






/*
--------------------------------------------------------------------------------
  TERMINATE THE CAMPAIGN

  DELETE <<campaign execution url>>

  BODY: NONE

  ANSWER: NONE

  APIToken required!

*/
Repository.prototype.terminateCampaign = function (campaign_execution_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('DELETE')
          .setUrl(campaign_execution_url)
          .getCall();

};






/*
--------------------------------------------------------------------------------
  GET CAMPAIGN STATISTICS

  GET <<campaign statistics url>>

  BODY: NONE

  ANSWER:
    {
        "images": "NUMBER OF IMAGES IN THE CAMPAIGN",
        "accepted": "NUMBER OF ACCEPTED IMAGES",
        "rejected": "NUMBER OF REJECTED IMAGES",
        "annotation": "NUMBER OF ANNOTATIONS"
    }


  APIToken required!

*/
Repository.prototype.getCamapaignStatistics = function (campaign_statistics_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('GET')
          .setUrl(campaign_statistics_url)
          .getCall();

};





/*
--------------------------------------------------------------------------------
  LIST THE WORKERS IN THE CAMPAIGN

  GET <<campaign workers url>>

  BODY: NONE

  ANSWER:
    {
        "workers": [
            {
                "id": "woker url",
                "fullname": "FULLNAME OF THE WORKER",
                "selector": "IS THE WORKER A SELECTOR",
                "annotator": "IS THE WORKER AN ANNOTATOR"
            }
        ]
    }

  APIToken required!

*/
Repository.prototype.getCamapaignWorkers = function (campaign_workers_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('GET')
          .setUrl(campaign_workers_url)
          .getCall();

};






/*
--------------------------------------------------------------------------------
  GET WORKER INFOS

  GET <<worker url>>

  BODY: NONE

  ANSWER:
    {
        "id": "woker url",
        "fullname": "FULLNAME OF THE WORKER",
        "selector": "IS THE WORKER A SELECTOR",
        "annotator": "IS THE WORKER AN ANNOTATOR",
        "selection": "worker selection url",
        "annotation": "worker annotation url"
    }


  APIToken required!

*/
Repository.prototype.getWorkerInfos = function (worker_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('GET')
          .setUrl(worker_url)
          .getCall();

};







/*
--------------------------------------------------------------------------------
  ENABLE THE WORKER FOR SELECTION

  POST <<worker selection url>>

  BODY: NONE

  ANSWER: NONE

  APIToken required!

*/
Repository.prototype.enableWorkerSelection = function (worker_selection_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('POST')
          .setUrl(worker_selection_url)
          .getCall();

};







/*
--------------------------------------------------------------------------------
  DISABLE THE WORKER FOR SELECTION

  DELETE <<worker selection url>>

  BODY: NONE

  ANSWER: NONE

  APIToken required!

*/
Repository.prototype.disableWorkerSelection = function (worker_selection_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('DELETE')
          .setUrl(worker_selection_url)
          .getCall();

};







/*
--------------------------------------------------------------------------------
  ENABLE THE WORKER FOR ANNOTATION

  POST <<worker annotation url>>

  BODY: NONE

  ANSWER: NONE

  APIToken required!

*/
Repository.prototype.enableWorkerAnnotation = function (worker_annotation_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('POST')
          .setUrl(worker_annotation_url)
          .getCall();

};





/*
--------------------------------------------------------------------------------
  DISABLE THE WORKER FOR ANNOTATION

  DELETE <<worker annotation url>>

  BODY: NONE

  ANSWER: NONE

  APIToken required!

*/
Repository.prototype.disableWorkerAnnotation = function (worker_annotation_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('DELETE')
          .setUrl(worker_annotation_url)
          .getCall();

};

exports.createRepository = Repository;
