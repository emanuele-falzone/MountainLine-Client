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
  LIST THE IMAGES IN THE CAMPAIGN

  GET <<campaign images url>>

  BODY: NONE

  ANSWER:
    {
        "images": [
            {
                "id": "IMAGE URL",
                "canonical": "CANONICAL URL OF THE IMAGE (can be used in img tags without Authorization)"
            }
        ]
    }

  APIToken required!
*/
Repository.prototype.getImages = function (campaign_images_url) {

    return this.manager.getRequest()
            .setAPIToken()
            .setMethod('GET')
            .setUrl(campaign_images_url)
            .getCall(this,
                  function(self,result){
                      self.db.remove({}, { multi: true }, function (err, numRemoved) {});
                      self.db.insert(result.images)
                    });

};





/*
--------------------------------------------------------------------------------
  UPLOAD A NEW IMAGE

  POST <<campaign images url>>

  BODY:
    {
        "body": formaData,
    }

  ANSWER: Location Header with the url of the new resource

  APIToken required!
  Content-Type: multipart/form-data
*/
Repository.prototype.uploadImage = function (campaign_images_url,formData) {

    return this.manager.getRequest()
            .setAPIToken()
            .forFile()
            .setUrl(campaign_images_url)
            .setBody(formData)
            .getCall();

};





/*
--------------------------------------------------------------------------------
  GET IMAGE INFOS

  GET <<image url>>

  BODY: NONE

  ANSWER:
    {
        "id": "IMAGE URL",
        "canonical": "CANONICAL URL OF THE IMAGE (can be used in img tags without Authorization)",
        "statistics": "image statistics url",
    }

  APIToken required!
*/
Repository.prototype.getImageInfos = function (image_url) {

    return this.manager.getRequest()
            .setAPIToken()
            .setMethod('GET')
            .setUrl(image_url)
            .getCall();

};





/*
--------------------------------------------------------------------------------
  DELETE AN IMAGE

  DELETE <<image url>>

  BODY: NONE

  ANSWER: NONE

  APIToken required!
*/
Repository.prototype.deleteImage = function (image_url,APIToken) {

    return this.manager.getRequest()
            .setAPIToken(APIToken)
            .setMethod('DELETE')
            .setUrl(image_url)
            .getCall();

};






/*
--------------------------------------------------------------------------------
  GET IMAGE STATISTICS

  GET <<image statistics url>>

  BODY: NONE

  ANSWER:
    {
        "selection": {
            "accepted": "NUMBER OF POSITIVE SELECTIONS",
            "rejected": "NUMBER OF NEGATIVE SELECTIONS"
        },
        "annotation": [
            "ANNOTATION",
            "OTHER ANNOTATION"
        ]
    }

  APIToken required!
  Content-Type: application/json
*/
Repository.prototype.getImageStatistics = function (image_statistics_url, APIToken) {

    return this.manager.getRequest()
            .setAPIToken(APIToken)
            .setMethod('GET')
            .setUrl(image_statistics_url)
            .getCall();

};





exports.createRepository = Repository;
