/*jslint node: true, indent: 2,nomen:true */
"use strict";

var apiUrl          = require('../../config')().API,
  Bacon    = require('baconjs').Bacon,
  passport = require('passport'),
  rest     = require('restler');

module.exports = function (server) {
  server.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
      if (err) { return next(err); }
      if (!user) {
        res.end();
      } else {
        req.logIn(user, function (err) {
          if (err) { return next(err); }
          res.status(200).send({
            username: req.body.username,
            access: true
          });
        });
      }

    })(req, res, next);
  });

  server.post('/logout', function (req, res) {
    req.logout();
    res.status(200).end();
  });
};
