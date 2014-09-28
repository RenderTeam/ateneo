/*jslint node: true, indent: 2,nomen:true */
'use strict';

function routeConfig(routeProvider) {
  routeProvider
    .when('/study-groups', {
      controller :  'NewStudyGroup',
      templateUrl : '/html/study_groups/new.html'
    })
    .when('/study-groups/:groupId', {
      controller :  'AdministrateStudyGroup',
      templateUrl : '/html/study_groups/study_group.html'
    });
}

module.exports = function (app) {
  app.config(routeConfig);
};

routeConfig.$inject = ['$routeProvider'];
