/*jslint node: true, indent: 2,nomen:true, stupid:true, regexp:true */
'use strict';
var fs            = require('fs');

module.exports = function () {
  var requires = [];
  fs.readdirSync('./sections/').forEach(function (file) {
    var fullpath  = './sections/' + file,
      isDirectory = fs.lstatSync(fullpath).isDirectory(),
      dir;

    if (isDirectory && file !== '_default') {
      dir = file;

      fs.readdirSync('./sections/' + dir).forEach(function (file) {
        if (/.*\.browser.js$/.test(file)) {
          requires.push('injector.invoke(require(\'../' + dir + '/' + file + '\'));');
        }
      });
    }
  });
  return requires.join('');
};
