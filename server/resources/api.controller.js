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
    send(res, OK, 'You have reached the Quotes API. I hope you enjoy your stay!', false);
  },
  getQuotes(req, res) {
    read((data) => {
      console.log("-------- iam called")
      let filtered = _.filter(data, (quote) => {
        if (req.query.author) {
          return req.query.author === quote.author;
        }
        return true;
      });
      send(res, OK, { quotes: filtered, length: filtered.length });
    });
  },
  getRandomQuote(req, res) {
    read((quote) => {
      const randomIndex = Math.floor(Math.random() * quote.length);
      send(res, OK, quote[randomIndex])
    })
  },
  overwriteQuote(req, res) {
    console.log("------------------- here")
    let quotes = req.body;
    let body = [];
    if (quotes.every(quote => quote.text.length > 0)) {
      for (var quote of quotes) {
        let line = quote.text + '~' + quote.author ;
       // console.log('line',line);
        body.push(line);
      }
      var txt = body.join('\n')
      fs.writeFile(QUOTES,txt,(error) => {
        console.log(txt);
        console.log("------------------- here")
        if(error) throw error;
        send(res, OK);
        console.log("------------------- done")
      })
    
    }else{
      console.log('else working:/')
      send(res,OK,'ERROR')
    }
    //  update((data)=>{
    //    console.log(data)
    //   send(res, OK, { });
    //  }) 
  }
}

/***Helpers***/

function read(cb) { // read the quotes text file into memory
  // your code here!
  let result = []
  fs.readFile(QUOTES, TYPE, (errorobj, bigStr) => {
    if (errorobj) console.log(errorsobj)
    let quotePairs = bigStr.split('\n');

    quotePairs.forEach((pair) => {
      formatTextAuthor(pair);
      result.push(formatTextAuthor(pair));
    });

    cb(result);
  });
}

function send(res, code, data, json = true) { //send a response
  res.status(code).send(json ? JSON.stringify(data) : data);
}

function update(cb) {

  fs.appendFile(QUOTES, 'data to append', 'utf8', (err) => {
    if (err) console.log(err);

    let result = [];
    fs.readFile(QUOTES, TYPE, (errorobj, bigStr) => {
      if (errorobj) console.log(errorsobj)
      let quatePairs = bigStr.split('\n');

      quotePairs.forEach((pair) => {
        console.log('format', formatTextAuthor(pair));
        result.push(formatTextAuthor(pair));
      });
    })
    cb(result);
  })
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
  const text = pair.substring(0,index);
  const author = pair.substring(index + 1, pair.length);
  let quote = {};
  quote.text = text;
  quote.author = author;
  return quote;
}