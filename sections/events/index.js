/*jslint node: true, indent: 2,nomen:true */
"use strict";

var paypal = require('paypal-rest-sdk');

module.exports = function (server) {
  server.get('/payment/paypal', function (req, res) {
    var savedCard = {
        "intent": "sale",
        "payer": {
            "payment_method": "credit_card",
            "funding_instruments": [{
                "credit_card_token": {
                    "credit_card_id": "CARD-5BT058015C739554AKE2GCEI"
                }
            }]
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };

    paypal.configure({
      'mode': 'sandbox', //sandbox or live
      'client_id': 'Ac9UaBA00fBms8pYHE0N9vJY23GLC2FYmd7GvFPtJffruLaWy9SKmLSP_Q9-',
      'client_secret': 'EGtGuBDMGZamIcmCGe3le33Voq7YD9Hxo-mYgQTruuhAXz6DK8dZ-zmjdt9X'
    });


    paypal.payment.create(savedCard, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Pay with stored card Response");
            console.log(JSON.stringify(payment));
        }

    });

  });
};
