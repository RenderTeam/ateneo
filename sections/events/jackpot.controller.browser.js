/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function event(scope,location, routeParams, Events, cssInjector) {
    cssInjector.add('css/events.css');

    scope.event = {

    };

    var currentEvent = {
      condition: {
        _id: routeParams.eventId
      }
    };

    Events.search(currentEvent)
      .success(function (response) {
        scope.event = response.data[0];
        console.log(response.data[0]);
    });
  }


  app.controller('Jackpot', event);
  event.$inject = ['$scope','$location', '$routeParams', 'Events', 'cssInjector'];
};
