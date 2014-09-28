/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {
  function battleGladiator(scope, routeParams, location, timeout, cssInjector, Events) {
    cssInjector.add('css/battle.css');

    scope.questionIndex = 0;

    var searchParams = {
      condition: {
        _id: routeParams.eventId
      }
    };

    Events.search(searchParams)
      .success(function (response) {
        console.log(response);
        var isAGladiator = __.indexOf(response.data[0].users, scope.username) > 0;

        if (!isAGladiator) {
          location.path('/battle/' + routeParams.eventId + '/spectate');
        }

        Events.getQuiz(routeParams.eventId)
          .success(function (quiz) {
            scope.quiz = quiz;
            scope.currentQuestion = scope.quiz[0];
          });
      });


    scope.sendAnswer = function () {
      var flag = scope.currentQuestion.answer === scope.currentQuestion.hisAnswer,
        answer = {
          correct: flag,
          answer: scope.currentQuestion.hisAnswer
        };

      Events.sendAnswer(routeParams.eventId, answer)
        .success(function (response) {
          if (scope.quiz.length > (scope.questionIndex + 1)) {
            scope.questionIndex++;
            scope.currentQuestion = scope.quiz[scope.questionIndex];
          }
        });
    };

    scope.loadScores = function () {
      Events.getScores(routeParams.eventId)
        .success(function (response) {
          scope.gladiators = __.keys(response);
          scope.scores = response;
        });

      timeout(function () {
        scope.loadScores();
      }, 2000);
    };

    scope.loadScores();
  }

  app.controller('BattleGladiator', battleGladiator);
  battleGladiator.$inject = ['$scope', '$routeParams', '$location', '$timeout', 'cssInjector', 'Events'];
};
