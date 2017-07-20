'use strict'

let
  router = require('express').Router(),
  controller = require('./api.controller.js');

router.get('/', controller.hello);
router.get('/quotes/random', controller.getRandomQuote);
router.route('/quotes')
  .get(controller.getQuotes)  // .put(/*insert controller method here*/)
  .post(controller.overwriteQuote);

module.exports = router;

