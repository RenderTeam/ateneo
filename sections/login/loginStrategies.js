/*jslint node: true, indent: 2,nomen:true */
'use strict';

var apiUrl          = require('../../config')().API,
    Bacon           = require('baconjs').Bacon,
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    rest            = require('restler');

module.exports = {
  localStrategy: new LocalStrategy(
    function( username, password, done ) {
      var url = apiUrl.concat('login'),
        user = {
          username: username,
          password: password
        };

      var login = (function() {
        var request = rest.post( url, { data: user } );
        return Bacon.fromEventTarget(request, 'complete');
      }());

      login.onValue( function ( data ) {
        if ( data.access ) {
          return done( null, { username: username });
        } else {
          done( null, false, { message: 'Incorrect username.' } );
        }
      });
    }
  ),

  serializeUser: function ( user, done ) {
    done( null, user );
  },

  deserializeUser: function(id, done) {
    if ( id )   { done(null, id); }
    else        { done(null, false); }
  }
};
