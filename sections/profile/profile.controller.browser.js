/*jslint node: true, indent: 2,nomen:true */
'use strict';
var moment = require('moment');

module.exports = function (app) {
  function profile(scope,timeout,location) {
    var date = moment( '2014-09-28 23:30' );
    var dateNow = moment();
    scope.view=0;
    scope.lu = date.diff(dateNow) / 1000;

    scope.openEvent = function  ( ) {
      location.path("study-groups/events/lu");
    };

    scope.openGroup = function  ( ) {
      location.path('study-groups/lu');
    };

  }
  app.controller('Profile', profile);
  profile.$inject = ['$scope','$timeout','$location'];
};
