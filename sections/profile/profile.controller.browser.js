/*jslint node: true, indent: 2,nomen:true */
'use strict';
var moment = require('moment');

module.exports = function (app) {
  function profile(scope,timeout,location,StudyGroups) {
    var date = moment( '2014-09-28 23:30' );
    var dateNow = moment();
    scope.view=0;
    scope.lu = date.diff(dateNow) / 1000;

    var params = {
      fields : ['_id']
    };

    StudyGroups.search(params)
      .success( function  ( response ) {
        console.log( response.data );
        scope.studyGroups = response.data;
      })
      .error( function  ( response ) {
        console.log( response );
      });

    scope.studyGroupView = function  ( studyGroup ) {
      scope.view = 2;
      scope.selectGroup = studyGroup;
    };


    scope.openEvent = function  ( ) {
      location.path("study-groups/events/lu");
    };

    scope.openGroup = function  ( id) {
      location.path('study-groups/'+id);
    };

  }
  app.controller('Profile', profile);
  profile.$inject = ['$scope','$timeout','$location', 'StudyGroups'];
};
