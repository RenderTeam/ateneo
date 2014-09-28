/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function event(scope,location, routeParams, Events) {
    scope.questionView = true;

    scope.returnProfile = function () {
      location.path("/profile");
    };

    var currentEvent = {
      condition: {
        _id: routeParams.eventId
      }
    };

    Events.search(currentEvent)
      .success(function (data) {
        console.log(data);
      });

  }


  app.controller('EventView', event);
  event.$inject = ['$scope','$location', '$routeParams', 'Events'];
};
