/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function login(scope, location, Auth) {
    scope.login = function () {
      scope.loading = true;
      Auth.login(
        scope.user,
        function (user) {
          scope.loading = false;
          scope.errorInLogin = false;
          if (user.access) {
            location.path('/profile');
          } else {
            scope.user = {};
            scope.errorInLogin = true;
          }
        },
        function (err) {
          console.log(err);
        }
      );
    };
  }

  app.controller('Login', login);
  login.$inject = ['$scope', '$location', 'Auth'];
};
