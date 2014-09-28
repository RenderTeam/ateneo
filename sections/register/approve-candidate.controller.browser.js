/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function approveCandidate(scope, routeParams, location, Candidates, Users) {
    var candidateParams = {
      condition: {
        '_id': routeParams.candidateId
      }
    };

    Candidates.search(candidateParams)
      .success(function (response) {
        scope.user = response.data[0];
      });

    scope.approve = function () {
      var params = {
        reference: scope.user
      };

      Users.new(params)
        .success(function (data) {
          if (data.status) {
            scope.alerts.push({
              type: 'success',
              message: 'Usuario creado correctamente'
            });

            Candidates.remove(candidateParams);

            location.path('/login');
          }
        });
    };
  }

  app.controller('ApproveCandidate', approveCandidate);
  approveCandidate.$inject = ['$scope', '$routeParams', '$location', 'Candidates', 'Users'];
};
