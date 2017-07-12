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
  GET CURRENT USER'S TASKS

  GET /api/task

  BODY: NONE

  ANSWER:
    {
        "tasks": [
            {
                "id": "task url",
                "type": "TYPE OF THE TASK (selection, annotation)"
            }
        ]
    }

  APIToken required!
*/
Repository.prototype.getTasks = function () {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('GET')
          .setUrl('/api/task')
          .getCall(this,
                function(self,result){
                    self.db.remove({}, { multi: true }, function (err, numRemoved) {});
                    self.db.insert(result.tasks);
                  });
};






/*
--------------------------------------------------------------------------------
  GET TASK INFORMATION

  GET <<task url>>

  BODY: NONE

  ANSWER:
    {
        "id": "task url",
        "type": "TYPE OF THE TASK (selection, annotation)",
        "session": "task session url",
        "statistics": "task statistics url",
    }


  APIToken required!
*/
Repository.prototype.getTaskInfos = function (task_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('GET')
          .setUrl(task_url)
          .getCall();
};





/*
--------------------------------------------------------------------------------
  START A WORKING SESSION FOR THE TASK

  POST <<task session url>>

  BODY: NONE

  ANSWER: NONE

  APIToken required!
*/
Repository.prototype.startSession = function (task_session_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('POST')
          .setUrl(task_session_url)
          .getCall()
};





/*
--------------------------------------------------------------------------------
  GET THE NEXT TASK INSTANCE (THE NEXT IMAGE TO WORK ON)

  GET <<task session url>>

  BODY: NONE

  ANSWER:
    {
        "type": "TYPE OF THE TASK (selection or annotation)",
        "image": "URL OF THE IMAGE (can be used in img tags without Authorization)",
        "size": "SIZE OF THE ANNOTATION (just for annotation tasks)"
    }

    (404 MEANS NO MORE IMAGES)

  APIToken required!
*/
Repository.prototype.getNextTask = function (task_session_url) {

  return this.manager.getRequest()
          .setAPIToken()
          .setMethod('GET')
          .setUrl(task_session_url)
          .getCall();
};






/*
--------------------------------------------------------------------------------
  SEND THE CURRENT RESULT

  PUT <<task session url>>

  BODY:
  (for selection tasks)
  {
      "accepted": "true or false"
  }

  (for annotation tasks)
  {
      "skyline": "STRING DESCRIBING THE SKYLINE (see the line-drawer component)"
  }

  ANSWER: NONE

  APIToken required!
  Content-Type: application/json
*/
Repository.prototype.sendCurrentResult = function (task_session_url, body, APIToken) {

  return this.manager.getRequest()
          .setAPIToken(APIToken)
          .setMethod('PUT')
          .setUrl(task_session_url)
          .setBody(body)
          .getCall();
};






/*
--------------------------------------------------------------------------------
  GET TASK STATISTICS

  GET <<task statistics url>>

  BODY: NONE

  ANSWER:
    {
        "available": "NUMBER OF AVAILABLE IMAGES",
        "accepted": "NUMBER OF ACCEPTED IMAGES (just for selection)",
        "rejected": "NUMBER OF REJECTED IMAGES (just for selection)",
        "annotated": "NUMBER OF ANNOTATED IMAGES (just for annotation)"
    }

  APIToken required!
*/
Repository.prototype.getTaskStatistics = function (task_statistics_url, APIToken) {

  return this.manager.getRequest()
          .setAPIToken(APIToken)
          .setMethod('GET')
          .setUrl(task_statistics_url)
          .getCall();
};





exports.createRepository = Repository;
