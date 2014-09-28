/*jslint node: true, indent: 2,nomen:true */
'use strict';

function routeConfig(routeProvider) {
  routeProvider.when('/study-groups/events/:eventId', {
    controller :  'EventView',
    templateUrl : '/html/events/event.html'
  })
  .when('/study-groups/events/:eventId/jackpot', {
    controller :  'Jackpot',
    templateUrl : '/html/events/jackpot.html'
  });
}

module.exports = function (app) {
  app.config(routeConfig);
};

routeConfig.$inject = ['$routeProvider'];
