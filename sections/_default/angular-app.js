/*jslint node: true, indent: 2,nomen:true */
/*global window, FileReader */
'use strict';
var di = require('di');
var angular = require('angular');
require('angular-bootstrap');
require('angular-cookies');
require('angular-css-injector');
require('angular-resource');
require('angular-route');
require('angular-translate');
require('angular-timer');

var app = angular.module('ateneo', [
    'angular.css.injector',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'pascalprecht.translate',
    'timer',
    'ui.bootstrap'
  ]);

function routeConfig(routeProvider, cssInjectorProvider) {
  cssInjectorProvider.setSinglePageMode(true);

  routeProvider.when('/403', {
      templateUrl: '/html/_views/403.html'
    })
    .when('/404', {
      templateUrl: '/html/_views/404.html'
    });

  routeProvider.otherwise({
    redirectTo : '/404'
  });
}

app.config(routeConfig);

routeConfig.$inject = ['$routeProvider', 'cssInjectorProvider'];

/**
 * Translation stuff
 */
app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', require('../_translations/en.json'));
  $translateProvider.translations('es', require('../_translations/es.json'));
  $translateProvider.preferredLanguage('es');
}]);
// End of translation stuff

var uiModules = {
  angular   : [ 'value', angular ],
  app       : [ 'value', app ],
  window    : [ 'value', window ]
};

uiModules.uiModules = [ 'value', uiModules ];

var injector = new di.Injector([uiModules]);
/* modules browserify */
