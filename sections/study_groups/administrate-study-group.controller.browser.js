/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function administrateStudyGroup(scope, routeParams, StudyGroups, Users, Events) {



    var searchParams = {
      condition: {
        _id: routeParams.groupId
      }
    };

    StudyGroups.search(searchParams)
      .success(function (response) {
        scope.studyGroup = response.data[0];
        console.log(response);
      });

    Users.search()
      .success(function (response) {
        scope.users = response.data;
        console.log( response );
      });

    scope.saveNewUser = function  () {
      console.log( scope.newUser );
      scope.studyGroup.users.push( scope.newUser.username );

      var updateParams = {
        condition: {
          _id: routeParams.groupId
        },
        reference : scope.studyGroup
      };

      StudyGroups.update( updateParams )
        .success(function (response) {
          console.log(response);
          scope.hideNewUser = false;
        });
    };

    scope.saveNewEvent = function  () {
      scope.newEvent.date = scope.newEvent.date + ' ' +scope.hour + ':' + scope.minute;
      scope.newEvent.users = scope.studyGroup.users;
      scope.newEvent.jackpot = 0;
      scope.newEvent.study_group = routeParams.groupId;
      var params = {
        reference : scope.newEvent
      };
      Events.new(params)
        .success( function  (response) {
          console.log( response );
          scope.studyGroup.events.push( response._id );

          var updateParams = {
            condition: {
              _id: routeParams.groupId
            },
            reference : scope.studyGroup
          };

          StudyGroups.update( updateParams )
            .success(function (response) {
              console.log(response);
              location.path('profile/');
            });
        });



    };

  }

  app.controller('AdministrateStudyGroup', administrateStudyGroup);
  administrateStudyGroup.$inject = ['$scope', '$routeParams', 'StudyGroups', 'Users', 'Events'];
};
