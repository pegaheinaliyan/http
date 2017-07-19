'use strict'

const fs = require('fs');

const QUOTES = './server/data/quotes.txt',
      TYPE = 'utf8',
      OK = 200;

let cache = null;

/***Controllers***/

module.exports = {
  hello(req, res) {
    send(res, OK,'You have reached the Quotes API. I hope you enjoy your stay!', false);
  }
  //your code here!
}

/***Helpers***/

function read (cb) { // read the quotes text file into memory
  // your code here!

  return cb(/* what goes in here? */)
}

function send (res, code, data, json = true) { //send a response
  res.status(code).send(json ? JSON.stringify(data) : data);
}