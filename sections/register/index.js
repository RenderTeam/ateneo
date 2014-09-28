/*jslint node: true, indent: 2,nomen:true */
"use strict";

var sendgrid  = require('sendgrid')('ardroz', 'sEddea07_25');

module.exports = function (server) {
  server.post('/candidate/send-mail', function (req, res) {
    var email     = new sendgrid.Email({
      to:       req.body.mail,
      from:     'darr.0725@gmail.com',
      subject:  'Registro ateneo',
      text:     'Bienvenido a Ateneo',
      html: '<a href = "http://178.62.222.127:7000/#/register/' + req.body.id + '" target = "_blank">Activar mi cuenta</a>'
    });

    sendgrid.send(email, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
      res.send(json);
    });
  });
};
