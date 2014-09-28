/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function newStudyGroup(scope, location) {

    scope.createStudyGroup = function () {

    };
    
    scope.RegisterNewStudyGroup = function () {
      location.path('/study-groups');
    };

  }

  app.controller('NewStudyGroup', newStudyGroup);
  newStudyGroup.$inject = ['$scope', '$location'];
};
