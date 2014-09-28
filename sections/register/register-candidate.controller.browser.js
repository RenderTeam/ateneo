/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function registerCandidate(scope, Candidates) {
    scope.register = function () {
      console.log(scope.user);
      /*Candidates.sendMail(scope.user)
        .success(function (data) {
          console.log(data);
        });*/
      var params = {
        reference: scope.user
      };

      Candidates.new(params)
        .success(function (data) {
          if (data.status) {
            scope.alerts.push({
              type: 'success',
              message: 'Se te ha enviado un correo para seguir el proceso de registro'
            });

            scope.user = {};
            scope.confirmMail = '';
          }
          console.log(data);
        });
    };
  }

  app.controller('RegisterCandidate', registerCandidate);
  registerCandidate.$inject = ['$scope', 'Candidates'];
};
