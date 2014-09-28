/*jslint node: true, indent: 2,nomen:true */
'use strict';

function routeConfig(routeProvider) {
  routeProvider.when('/profile', {
    controller :  'Profile',
    templateUrl : '/html/profile/profile.html'
  });
}

module.exports = function (app) {
  app.config(routeConfig);
};

routeConfig.$inject = ['$routeProvider'];
