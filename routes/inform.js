var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inform = require('../models/inform.js');

router.get('/', function(req, res, next) {
  Inform.find(function (err, informs) {
    if (err) return next(err);
    res.json(informs);
    console.log(informs);
  });
});

router.post('/', function(req, res, next) {
    Inform.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
      console.log(post);
    });
  });

router.get('/:id', function(req, res, next) {
    Inform.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

router.put('/:id', function(req, res, next) {
    Inform.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });  

router.delete('/:id', function(req, res, next) {
    Inform.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
module.exports = router;