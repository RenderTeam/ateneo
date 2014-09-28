/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._,
  utils = require('../_common/utils');

module.exports = function (app) {
  function users(http) {
    var user = {};

    user.new = function (params) {
      var url = '/user/new';

      var promise = http.post(url, params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    user.sendMail = function (params) {
      var url = '/user/send-mail';

      var promise = http.post(url, params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    user.search = function (params) {
      var promise = http.post('/user', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    user.approve = function (params) {
      var promise = http.post('/user/approve', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    return user;
  }
  app.factory('Users', users);

  users.$inject = ['$http'];
};
