'use strict'

let
  router = require('express').Router(),
  controller = require('./api.controller.js');

router.get('/', controller.hello);
// router.get('/quotes/random' /*insert controller method here*/);
// router.route('/quotes')
  // .get(/*insert controller method here*/)
  // .put(/*insert controller method here*/)
  // .post(/*insert controller method here*/);

module.exports = router;
