/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function battleGladiator(scope, cssInjector) {
    cssInjector.add('css/battle.css');
  }


  app.controller('BattleGladiator', battleGladiator);
  battleGladiator.$inject = ['$scope', 'cssInjector'];
};
