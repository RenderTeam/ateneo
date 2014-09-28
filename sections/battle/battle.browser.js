/*jslint node: true, indent: 2,nomen:true */
'use strict';

function routeConfig(routeProvider) {
  routeProvider
    .when('/battle/:eventId', {
      controller :  'BattleGladiator',
      templateUrl : '/html/battle/gladiator.html'
    })
    .when('/battle/:eventId/spectate', {
      controller :  'BattleSpectator',
      templateUrl : '/html/battle/spectator.html'
    });
}

module.exports = function (app) {
  app.config(routeConfig);
};

routeConfig.$inject = ['$routeProvider'];
