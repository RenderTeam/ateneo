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

    event.update = function (params) {
      var url = '/event';

      var promise = http.put(url, params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    event.search = function (params) {
      params.fields = ['_id'];
      var promise = http.post('/event', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    event.getQuiz = function (eventId) {
      var promise = http.get('/events/' + eventId + '/quiz')
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    event.sendAnswer = function (eventId, params) {
      var promise = http.put('/events/' + eventId + '/answer', params)
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    event.getScores = function (eventId) {
      var promise = http.get('/events/' + eventId + '/score')
        .success(utils.returnData)
        .error(utils.onError);

      return promise;
    };

    event.pay = function (event, budget) {
      var params = {
        'event': event,
        'budget': budget
      }, promise = http.post('/payment/paypal', params)
        .success(function (res) {
          console.log(res);
        })
        .error(function (error) {
          console.log(error);
        });

        return promise;
    };

    return event;
  }
  app.factory('Events', events);

  events.$inject = ['$http'];
};
