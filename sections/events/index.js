/*jslint node: true, indent: 2,nomen:true */
"use strict";
var apiUrl          = require('../../config')().API,
    Bacon           = require('baconjs').Bacon,
    rest            = require('restler'),
    __              = require('underscore')._;

module.exports = function (server) {
  server.get('/events/:eventId/quiz', function (req, res) {
    var eventId = req.params.eventId,
        url = apiUrl.concat('event'),
        searchParams = {
          condition: {
            _id: eventId
          }
        };

    var bacon = (function() {
      var request = rest.post( url, { data: searchParams }  );
      return Bacon.fromEventTarget(request, 'complete');
    }());

    bacon.onValue( function ( response ) {
      var battle = response.data[0],
        quiz;

      if (battle.quiz) {
        res.send(battle.quiz);
        res.end();
      }

      if (battle.total_question_per_event > battle.questions.length) {
        quiz = battle.questions;
      } else {
        quiz = __.shuffle(battle.questions).splice(0, battle.total_question_per_event);
      }

      var updateParams = {
        condition: {
          _id: eventId
        },
        reference: {
          quiz: quiz
        }
      };

      var update = (function() {
        var request = rest.put( url, { data: updateParams }  );
        return Bacon.fromEventTarget(request, 'complete');
      }());

      update.onValue(function (response) {
        res.json( quiz );
      });
    });
  });

  server.get('/events/:eventId/score', function (req, res) {
    var eventId = req.params.eventId,
        url = apiUrl.concat('event'),
        searchParams = {
          condition: {
            _id: eventId
          }
        };

    var bacon = (function() {
      var request = rest.post( url, { data: searchParams }  );
      return Bacon.fromEventTarget(request, 'complete');
    }());

    bacon.onValue( function ( response ) {
      if (response.data) {

        var battle = response.data[0];

        res.json(battle.answers);
      } else {
        res.json({});
      }
    });
  });

  server.put('/events/:eventId/answer', function (req, res) {
    var eventId = req.params.eventId,
      answer = req.body,
      user = req.user.username,
      url = apiUrl.concat('event'),
      searchParams = {
        condition: {
          _id: eventId
        }
      };

    var bacon = (function() {
      var request = rest.post( url, { data: searchParams }  );
      return Bacon.fromEventTarget(request, 'complete');
    }());

    bacon.onValue( function ( response ) {
      var battle = response.data[0],
        answers = battle.answers;

      if (answers && answers[user]) {
        answers[user].score = answer.correct ? parseInt(answers[user].score) + 1:answers[user].score;
        answers[user].answers.push(answer);
      } else if (answers) {
        answers[user] = {
          score: answer.correct ? 1:0,
          answers: [answer]
        };
      } else {
        answers = {};

        answers[user] = {
          score: answer.correct ? 1:0,
          answers: [answer]
        };
      }

      var updateParams = {
        condition: {
          _id: eventId
        },
        reference: {
          answers: answers
        }
      };

      var update = (function() {
        var request = rest.put( url, { data: updateParams }  );
        return Bacon.fromEventTarget(request, 'complete');
      }());

      update.onValue(function (response) {
        res.json( response );
      });
    });
  });
};
