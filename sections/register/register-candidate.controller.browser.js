/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function registerCandidate(scope, Candidates) {
    scope.register = function () {
      var params = {
        reference: scope.user
      };

      Candidates.new(params)
        .success(function (data) {
          if (data.status) {
            scope.user.id = data._id;
            Candidates.sendMail(scope.user)
              .success(function (data) {
                console.log(data);
                scope.alerts.push({
                  type: 'success',
                  message: 'Se te ha enviado un correo para seguir el proceso de registro'
                });

                scope.user = {};
                scope.confirmMail = '';
              });
          }
        });
    };
  }

  app.controller('RegisterCandidate', registerCandidate);
  registerCandidate.$inject = ['$scope', 'Candidates'];
};
