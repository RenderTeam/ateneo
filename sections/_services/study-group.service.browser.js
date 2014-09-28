/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._,
  utils = require('../_common/utils');

module.exports = function (app) {
  function studyGroups(http) {
    var studyGroup = {};

    studyGroup.new = function (params) {
      var url = '/studyGroup/new';

      var promise = http.post(url, params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    studyGroup.search = function (params) {
      var promise = http.post('/studyGroup', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    studyGroup.remove = function (params) {
      var promise = http.put('/studyGroup/delete', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    return studyGroup;
  }
  app.factory('StudyGroups', studyGroups);

  studyGroups.$inject = ['$http'];
};
