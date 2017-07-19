'use strict'

const fs = require('fs');
const _ = require('lodash')

const QUOTES = './server/data/quotes.txt',
      TYPE = 'utf8',
      OK = 200;

let cache = null;

/***Controllers***/

module.exports = {
  hello(req, res) {
    send(res, OK,'You have reached the Quotes API. I hope you enjoy your stay!', false);
  },
  getQuotes(req, res){
    read((data)=> {
      let filtered = _.filter(data, (quote)=> {
          if(req.query.author) {
            return req.query.author === quote.author;
          }
      });
      send(res,OK,{ quotes: filtered, length: filtered.length});
    });
 },
 getRandomQuote(req, res) {
     random((data)=> {
     send(res, OK, {data});
   })
 }
}

/***Helpers***/

function read (cb) { // read the quotes text file into memory
  // your code here!
  let result = []
  fs.readFile(QUOTES, TYPE, (errorobj, bigStr)=> {
    if(errorobj) console.log(errorsobj)
    let quotePairs = bigStr.split('\n');

    quotePairs.forEach((pair)=> {
      formatTextAuthor(pair);
      result.push(formatTextAuthor(pair));
    });

    cb(result);        
  });
}

function send (res, code, data, json = true) { //send a response
  res.status(code).send(json ? JSON.stringify(data) : data);
}

function random (cb) { // read the quotes text file into memory
  // your code here!
  let result = []
  fs.readFile(QUOTES, TYPE, (errorobj, bigStr)=> {
    if(errorobj) console.log(errorsobj)
    let quatePairs = bigStr.split('\n');

    quatePairs.forEach((pair)=> {
      formatTextAuthor(pair);
      result.push(formatTextAuthor(pair));
    });

    const length = result.length;
    const randomIndex = Math.floor(Math.random() * length);
    cb(result[randomIndex]);
  });
}

function formatTextAuthor (pair) {
  const index = pair.indexOf('~');
  const text = pair.substring(0,index - 1);
  const author = pair.substring(index + 1, pair.length - 1);
  let quote = {};
  quote.text = text;
  quote.author = author;
  return quote;
}