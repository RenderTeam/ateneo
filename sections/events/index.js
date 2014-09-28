/*jslint node: true, indent: 2,nomen:true */
"use strict";
var apiUrl = require('../../config')().API,
    Bacon = require('baconjs').Bacon,
    rest = require('restler'),
    paypal = require('paypal-rest-sdk');

module.exports = function (server) {
  server.post('/payment/paypal', function (req, res) {
    var params = req.body;
    console.log(params.budget);
    var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "credit_card",
          "funding_instruments": [{
              "credit_card": {
                  "type": "visa",
                  "number": "4417119669820331",
                  "expire_month": "11",
                  "expire_year": "2018",
                  "cvv2": "874",
                  "first_name": "Joe",
                  "last_name": "Shopper",
                  "billing_address": {
                      "line1": "52 N Main ST",
                      "city": "Johnstown",
                      "state": "OH",
                      "postal_code": "43210",
                      "country_code": "US"
                  }
              }
          }]
      },
      "transactions": [{
          "amount": {
              "total": params.budget.toString(),
              "currency": "USD"
          },
          "description": "This is the payment transaction description."
      }]
    };
    paypal.configure({
      'mode': 'sandbox', //sandbox or live
      'client_id': 'ATjemBAjV-Wpvfglv2I1tAHiFIBUPN1Bmrhi663cMiFcHqWlMU5otixeAIwn',
      'client_secret': 'EF5eARD6cfbUdrzIbHRnGRWnF7fZwNWefBh0LsOSQ3srTmzVnsvMXOGt-ezd'
    });

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log(error.response.details);
      } else {
          console.log("Create Payment Response");
          console.log(payment);
      }
    });

    var event = params.event,
      url = apiUrl.concat('event/'),
      bacon = {},
      data = {};

      data = {
        condition: params.event._id,
        reference: {
          jackpot : params.event.jackpot + Number(params.budget)
        }
      };

      console.log('############');
      console.log(data);
      console.log('############');

    bacon = (function () {
      var peticion = rest.put(url, {
        data: req.body,
        parser: rest.parsers.json
      });
      return Bacon.fromEventTarget(peticion, 'complete');
    }());

    bacon.onValue(function (data) {
      res.send(data);
    });

    res.redirect('/');
  });
};
