/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = {
  returnData: function (response) {
    return response.data;
  },

  onError: function (error) {
    console.log(error);
  }
};
