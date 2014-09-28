/*jslint node: true, indent: 2,nomen:true */
'use strict';
var moment = require('moment');
var __ = require('underscore')._;

module.exports = function (app) {
  function profile(scope,timeout,location,StudyGroups,Events,Auth) {

    scope.view=0;
    var date = moment( '2014-09-29 23:30' );
    var dateNow = moment();
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

    Events.search(params)
      .success( function  ( response ) {
        scope.events = response.data;
        console.log( scope.events );
      });

    scope.studyGroupView = function  ( studyGroup ) {
      scope.eventsGroup = [];

      scope.view = 2;
      scope.selectGroup = studyGroup;
    };

    scope.eventView = function  ( event ) {
      scope.view = 1;
      scope.selectEvent = event;
      var time = moment(scope.selectEvent.date);
      //var dateNow = moment();

      console.log(time);
      console.log(dateNow);
      console.log(Math.floor(time.diff(dateNow) / 1000));
      //scope.timeTimer = Math.floor(time.diff(dateNow) / 1000);
      scope.timeTimer = 88590;
      scope.lu = 6886589;
    };


    scope.openEvent = function  ( id ) {
      location.path("study-groups/events/"+id);
    };

    scope.openGroup = function  ( id) {
      location.path('study-groups/'+id);
    };

  }
  app.controller('Profile', profile);
  profile.$inject = ['$scope','$timeout','$location', 'StudyGroups','Events','Auth'];
};
