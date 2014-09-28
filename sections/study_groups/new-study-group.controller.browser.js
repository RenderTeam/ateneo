/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {
  function newStudyGroup(scope, location, Users, Auth, StudyGroups) {
    var searchParams = {
      fields: ['username', 'mail']
    };

    scope.usersAdded = [];

    Users.search(searchParams)
      .success(function (response) {
        scope.users = response.data;
      });

    scope.addUser = function () {
      if (scope.selectedUser) {
        var flag = __.some(scope.usersAdded, function (user) {
          return user.username === scope.selectedUser.username;
        });

        if ( !flag ) {
          scope.usersAdded.push(scope.selectedUser);
        }
      }
    };

    scope.removeUser = function (index) {
      scope.usersAdded.splice(index, 1);
    };

    scope.createStudyGroup = function () {
      var users = __.map( scope.usersAdded, function (user) {
        return user.username;
      });

      var studyGroupParams = {
        reference: {
          name: scope.study_group.name,
          admin: Auth.user.username,
          users: users
        }
      };

      StudyGroups.new(studyGroupParams)
        .success(function (response) {
          if (response.status) {
            location.path('/study-groups/' + response._id);
          }
        });
    };
  }

  app.controller('NewStudyGroup', newStudyGroup);
  newStudyGroup.$inject = ['$scope', '$location', 'Users', 'Auth', 'StudyGroups'];
};
