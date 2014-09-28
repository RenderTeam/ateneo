/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function event(scope,location, routeParams, Events) {
    scope.questionView = true;
    scope.question = {
      question: '',
      alternatives: [],
      answer: '',
      user: scope.username
    };

    scope.saveQuestion = function  () {
      console.log(scope.question);
      scope.event.questions.push( scope.question );
      var params = {
        condition: {
          _id: routeParams.eventId
        },
        reference : scope.event

      };
      console.log(params);
      Events.update( params )
        .success( function  (data) {
          console.log(data);
        });
    };

    scope.returnProfile = function () {
      location.path("/profile");
    };

    scope.enrollInEvent = function (event, budget) {
      console.log(event, budget);
      Events.pay(event, budget)
        .success(function (data) {
          console.log(data);
        });
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


  app.controller('EventView', event);
  event.$inject = ['$scope','$location', '$routeParams', 'Events'];
};
