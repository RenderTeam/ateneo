/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function approveCandidate(scope, routeParams, Candidates) {
    console.log(routeParams);
    var params = {
      condition: {
        '_id': routeParams.candidateId
      }
    };

    Candidates.search(params)
      .success(function (response) {
        console.log(response);
      });

    scope.approve = function () {
      console.log(scope.user);
    };
  }

  app.controller('ApproveCandidate', approveCandidate);
  approveCandidate.$inject = ['$scope', '$routeParams', 'Candidates'];
};
