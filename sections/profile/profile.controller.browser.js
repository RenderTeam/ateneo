/*jslint node: true, indent: 2,nomen:true */
'use strict';
var moment = require('moment');

module.exports = function (app) {
  function profile(scope,timeout) {
    console.log('hola');
    var a = moment('2014-09-29'), now = moment();


    console.log(a);
    console.log(a.fromNow());


    var countUp = function() {
      var seconds, milliseconds;
      now = moment();
      console.log('Difference is ', a.diff(now));
      milliseconds = a.diff(now);
      console.log( milliseconds );
      seconds = milliseconds / 1000;
      scope.secondEvent = seconds % 60;
      scope.minutsEvent = (seconds / 60) ;
      console.log( (seconds / 60) );
      console.log( 125 % 60);
      scope.hoursEvent = ((seconds / 60) / 60) % 24;
      timeout(countUp, 500);
      console.log( 'hola');
    };

    timeout(countUp, 1000);
  }


  app.controller('Profile', profile);
  profile.$inject = ['$scope','$timeout'];
};
