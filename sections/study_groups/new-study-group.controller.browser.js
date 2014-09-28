/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function newStudyGroup(scope) {
    console.log('New studyGroup');
  }

  app.controller('NewStudyGroup', newStudyGroup);
  newStudyGroup.$inject = ['$scope'];
};
