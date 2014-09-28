/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function administrateStudyGroup(scope, routeParams,location) {
    console.log(routeParams);
    console.log('administrateStudyGroup');
    
  }

  app.controller('AdministrateStudyGroup', administrateStudyGroup);
  administrateStudyGroup.$inject = ['$scope', '$routeParams','$location'];
};
