/*jslint node: true, indent: 2,nomen:true */
"use strict";

var sendgrid  = require('sendgrid')('ardroz', 'sEddea07_25');

module.exports = function (server) {
  server.post('/candidate/send-mail', function (req, res) {
    var email     = new sendgrid.Email({
      to:       req.body.mail,
      from:     'darr.0725@gmail.com',
      subject:  'Primer correo cool',
      text:     'Hello world'
    });

    sendgrid.send(email, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
      res.send(json);
    });
  });
};
