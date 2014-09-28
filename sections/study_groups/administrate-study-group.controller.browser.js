/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function administrateStudyGroup(scope, routeParams, StudyGroups) {
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
  }

  app.controller('AdministrateStudyGroup', administrateStudyGroup);
  administrateStudyGroup.$inject = ['$scope', '$routeParams', 'StudyGroups'];
};
