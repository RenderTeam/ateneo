/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function event(scope,location) {
    scope.questionView = true;

    scope.returnProfile = function  ( ) {
        location.path("/profile");
      };

  }


  app.controller('Event', event);
  event.$inject = ['$scope','$location'];
};
