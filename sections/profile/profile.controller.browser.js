/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function profile(scope,timeout) {
  }


  app.controller('Profile', profile);
  profile.$inject = ['$scope','$timeout'];
};
