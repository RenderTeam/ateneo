/*jslint node: true, indent: 2,nomen:true */
'use strict';

function routeConfig(routeProvider) {
  routeProvider
    .when('/register', {
      controller :  'RegisterCandidate',
      templateUrl : '/html/register/register.html'
    })
    .when('/register/:candidateId', {
      controller :  'ApproveCandidate',
      templateUrl : '/html/register/approve.html'
    });
}

module.exports = function (app) {
  app.config(routeConfig);
};

routeConfig.$inject = ['$routeProvider'];
