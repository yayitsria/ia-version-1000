var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inventory', { title: 'Inventory', style: 'style.css' });
});

module.exports = router;