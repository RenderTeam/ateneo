/*jslint node: true, indent: 2,nomen:true */
'use strict';

function routeConfig(routeProvider) {
  routeProvider.when('/study-groups/events/:eventId', {
    controller :  'Event',
    templateUrl : '/html/events/event.html'
  });
}

module.exports = function (app) {
  app.config(routeConfig);
};

routeConfig.$inject = ['$routeProvider'];
