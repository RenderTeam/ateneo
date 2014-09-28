/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function main(scope, translate, rootScope, location, Auth, cssInjector) {
    scope.isLoggedIn = Auth.isLoggedIn();
    scope.alerts = [];

    scope.closeAlert = function (index) {
      scope.alerts.splice(index, 1);
    };

    scope.languages = [
      { language: 'Español', key: 'es' },
      { language: 'Inglés', key: 'en' }
    ];

    scope.language = 'es';

    scope.$watch('language', function (newValue) {
      translate.use(newValue);
    }, true);

    scope.logout = function () {
      Auth.logout(
        function () {
          location.path('/login');
        },
        function () {
          console.log('Failed to logout');
        }
      );
    };

    /*jslint unparam:true*/
    rootScope.$on('$routeChangeStart', function ( event, next, current ) {
      cssInjector.removeAll();
      var flag = next.$$route && next.$$route.originalPath && (/public/g.test(next.$$route.originalPath) || /register/g.test(next.$$route.originalPath));
      if ( !flag && !Auth.isLoggedIn() ) {
        //location.path('/login');
      }
    });
    /*jslint unparam:false*/

    rootScope.$on('$routeChangeSuccess', function ( event, next, current ) {
      scope.alerts = [];
    });
  }

  app.controller('Main', main);
  main.$inject = [ '$scope', '$translate', '$rootScope', '$location',
    'Auth', 'cssInjector' ];
};
