/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._,
  utils = require('../_common/utils');

module.exports = function (app) {
  function events(http) {
    var event = {};

    event.new = function (params) {
      var url = '/event/new';

      var promise = http.post(url, params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    event.search = function (params) {
      var promise = http.post('/event', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    return event;
  }
  app.factory('Events', events);

  events.$inject = ['$http'];
};
