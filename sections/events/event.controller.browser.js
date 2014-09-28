/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function event(scope,timeout) {

  }


  app.controller('Event', event);
  event.$inject = ['$scope','$timeout'];
};
