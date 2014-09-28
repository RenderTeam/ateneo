/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._,
  utils = require('../_common/utils');

module.exports = function (app) {
  function candidates(http) {
    var candidate = {};

    candidate.new = function (params) {
      var url = '/candidate/new';

      var promise = http.post(url, params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    candidate.sendMail = function (params) {
      var url = '/candidate/send-mail';

      var promise = http.post(url, params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    candidate.search = function (params) {
      var promise = http.post('/candidate', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    candidate.approve = function (params) {
      var promise = http.post('/candidate/approve', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    return candidate;
  }
  app.factory('Candidates', candidates);

  candidates.$inject = ['$http'];
};
