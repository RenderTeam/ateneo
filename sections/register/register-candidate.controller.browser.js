/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function registerCandidate(scope, Candidates) {
    scope.register = function () {
      console.log(scope.user);
      Candidates.sendMail(scope.user)
        .success(function (data) {
          console.log(data);
        });
    };
  }

  app.controller('RegisterCandidate', registerCandidate);
  registerCandidate.$inject = ['$scope', 'Candidates'];
};
